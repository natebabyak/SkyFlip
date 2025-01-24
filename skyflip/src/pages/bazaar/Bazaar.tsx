import { ReactNode, useContext, useState } from 'react';
import CopyButton from '../../components/copyButton/CopyButton.tsx';
import Footer from '../../components/footer/Footer.tsx';
import Header from '../../components/header/Header.tsx';
import Loading from '../../components/loading/Loading.tsx';
import Table from '../../components/table/Table.tsx';
import TaxButtons from '../../components/taxButtons/TaxButtons.tsx';
import { BazaarContext } from '../../context/BazaarContext.tsx';
import { ItemsContext } from '../../context/ItemsContext.tsx';
import formatCoins from '../../utils/formatCoins.ts';
import formatName from '../../utils/formatName.ts';
import formatNumber from '../../utils/formatNumber.ts';

const HEADERS = ["Item", "Insta-Buy", "Insta-Sell", "Profit", "Flips/h", "Coins/h"];
const HOURS_PER_WEEK = 168;
const MINIMUM_TO_OUTBID = 0.1;

type Tax = 0.01 | 0.01125 | 0.0125;

export default function Bazaar(): ReactNode {
  const bazaarData = useContext(BazaarContext);
  const itemsData = useContext(ItemsContext);
  const [tax, setTax] = useState<Tax>(0.01125);

  if (!bazaarData || !itemsData) return <Loading />;

  const products = Object.values(bazaarData.products).map(({ product_id, buy_summary, sell_summary, quick_status }) => {
    if (buy_summary.length > 0 && sell_summary.length > 0) {
      const { buyMovingWeek, sellMovingWeek } = quick_status;

      const buyPrice = buy_summary[0].pricePerUnit;

      const sellPrice = sell_summary[0].pricePerUnit;

      const sellOrderPrice = buyPrice - MINIMUM_TO_OUTBID;
      const buyOrderPrice = sellPrice + MINIMUM_TO_OUTBID;
      const afterTaxMultiplier = 1 - tax;
      const profitPerFlip = sellOrderPrice * afterTaxMultiplier - buyOrderPrice;

      const boughtPerHour = buyMovingWeek / HOURS_PER_WEEK;
      const soldPerHour = sellMovingWeek / HOURS_PER_WEEK;
      const hoursPerSell = 1 / boughtPerHour;
      const hoursPerBuy = 1 / soldPerHour;
      const hoursPerFlip = hoursPerSell + hoursPerBuy;
      const flipsPerHour = 1 / hoursPerFlip;

      const profitPerHour = profitPerFlip * flipsPerHour;

      return {
        product_id,
        buyPrice,
        sellPrice,
        profitPerFlip,
        flipsPerHour,
        profitPerHour
      };
    }
    return null;
  }).filter((product) => product !== null).sort((a, b) => b.profitPerHour - a.profitPerHour);

  const data = products.map((product) => {
    const { product_id, buyPrice, sellPrice, profitPerFlip, flipsPerHour, profitPerHour } = product;
    const name = formatName(product_id, itemsData);

    return [
      <CopyButton buttonText={name} copyText={`/bz ${name}`} />,
      formatCoins(buyPrice),
      formatCoins(sellPrice),
      formatCoins(profitPerFlip),
      formatNumber(flipsPerHour),
      formatCoins(profitPerHour)
    ];
  }); 
                       
  return (
    <>
      <Header />
      <h1>Bazaar</h1>
      <TaxButtons tax={tax} setTax={setTax} />
      <Table headers={HEADERS} data={data} />
      <Footer />
    </>
  );
}