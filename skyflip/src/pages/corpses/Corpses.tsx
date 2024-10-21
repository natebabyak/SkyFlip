import { ReactNode, useContext } from "react";
import Footer from "../../components/footer/Footer.tsx";
import Header from "../../components/header/Header.tsx";
import Loading from "../../components/loading/Loading.tsx";
import Table from "../../components/table/Table.tsx";
import BazaarContext from "../../context/BazaarContext.tsx";
import ItemsContext from "../../context/ItemsContext.tsx";
import formatCoins from "../../utils/formatCoins.ts";
import formatName from "../../utils/formatName.ts";
import corpsesData from "./corpsesData.json";

export default function Corpses(): ReactNode {
  const bazaarData = useContext(BazaarContext);
  const itemsData = useContext(ItemsContext);

  if (!bazaarData || !itemsData) return <Loading />;

  const headers = [
    "Image",
    "Name",
    "Cost",
    "Revenue",
    "Profit"
  ];
  
  const data = Object.values(corpsesData.corpses).map((corpse) => {
    const { imageUrl, name, key, numDrops, totalWeight, dyeChance, drops } = corpse;
    const cost = bazaarData.products.find((product) => product.product_id === key)?.buy_summary[0].pricePerUnit;
    const expectedRevenue = drops.reduce((totalRevenue, drop) => {
      const dropProduct = bazaarData.products.find((product) => product.product_id === drop.id);
      const dropPrice = dropProduct?.buy_summary[0].pricePerUnit || 0;
      const dropRevenue = (dropPrice * drop.amount) * (drop.weight / totalWeight);
      return totalRevenue + dropRevenue;
    }, 0);
    const dyeValue = 1000000000;
    const dyeRevenue = dyeChance * dyeValue;
    const totalExpectedRevenue = (expectedRevenue * numDrops) + dyeRevenue;
    const profit = totalExpectedRevenue - (cost || 0);

    return [
      <img src={imageUrl} alt={name} />,
      formatName(name, itemsData),
      formatCoins(cost || 0),
      formatCoins(totalExpectedRevenue),
      formatCoins(profit)
    ];
  });

  
  return (
    <>
      <Header />
      <h1>Frozen Corpses</h1>
      <Table headers={headers} data={data} />
      <Footer />
    </>
  );
}