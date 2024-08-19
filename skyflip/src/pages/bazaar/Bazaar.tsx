import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer.tsx";
import Header from "../../components/header/Header.tsx";
import Table from "../../components/table/Table.tsx";
import formatCoins from "../../utils/formatCoins.ts";
import formatName from "../../utils/formatName.ts";
import formatNumber from "../../utils/formatNumber.ts";
import Loading from "../../components/loading/Loading.tsx";

const HOURS_IN_A_WEEK = 168;

interface Item {
  id: string,
  name: string
}

interface Product {
  product_id: string,
  sell_summary: {
    amount: number,
    pricePerUnit: number,
    orders: number
  }[],
  buy_summary: {
    amount: number,
    pricePerUnit: number,
    orders: number
  }[]
  quick_status: {
    productId: string,
    sellPrice: number,
    sellVolume: number,
    sellMovingWeek: number,
    sellOrders: number,
    buyPrice: number,
    buyVolume: number,
    buyMovingWeek: number,
    buyOrders: number
  }
}

interface BazaarData {
  success: boolean
  lastUpdated: number
  products: Product[]
}

type BazaarDataOrNull = BazaarData | null;

export default function Bazaar() {
  const [bazaarData, setBazaarData] = useState<BazaarDataOrNull>(null);
  const [itemsData, setItemsData] = useState(null);

  const tax: 0.01 | 0.01125 | 0.0125 = 0.01125;
  const sortDirection: -1 | 1 = -1;
  const sortColumn: "productId" | "instaBuy" | "instaSell" | "profitPerFlip" | "flipsPerHour" | "profitPerHour" = "profitPerHour";

  async function refreshBazaarData() {
    const url = "https://api.hypixel.net/v2/skyblock/bazaar";

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.success === false) {
        throw json.cause;
      } else {
        setBazaarData(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function refreshItemsData() {
    const url = "https://api.hypixel.net/v2/reources/skyblock/items";

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.success === false) {
        throw json.cause;
      } else {
        setItemsData(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    refreshBazaarData();
    refreshItemsData();
  }, [])

  if (!bazaarData) {
    const url = "https://api.hypixel.net/v2/skyblock/bazaar";
    return <Loading name="Hypixel Public API" url={url} />;
  } else if (!itemsData) {
    const url = "https://api.hypixel.net/v2/reources/skyblock/items";
    return <Loading name="Hypixel Public API" url={url} />;
  }

  const interval = setInterval(refreshBazaarData, 60000);

  
  const items: Item[] = Object.fromEntries(itemsData.map((item: Item) => [item.id, item.name]));
  clearInterval(interval);

  const headers = [
    "Item",
    "Insta-Buy",
    "Insta-Sell",
    "Profit",
    "Flips/h",
    "Coins/h"
  ]

  const products = Object.values(bazaarData.products).map((product) => {
    const { product_id, buy_summary, sell_summary, quick_status } = product;
    const { buyMovingWeek, sellMovingWeek } = quick_status;

    const productId = product_id;
    const instaBuy = buy_summary.length > 0
      ? buy_summary[0].pricePerUnit
      : null;

    const instaSell = sell_summary.length > 0
      ? sell_summary[0].pricePerUnit
      : null;

    const profitPerFlip = instaBuy && instaSell
      ? (instaBuy - 0.1) * (1 - tax) - (instaSell + 0.1)
      : null;

    const flipsPerHour = buyMovingWeek && sellMovingWeek
      ? 1 / (1 / (buyMovingWeek * HOURS_IN_A_WEEK) + 1 / (sellMovingWeek * HOURS_IN_A_WEEK))
      : null;

    const profitPerHour = profitPerFlip && flipsPerHour
      ? profitPerFlip * flipsPerHour
      : null;

    return {
      productId,
      instaBuy,
      instaSell,
      profitPerFlip,
      flipsPerHour,
      profitPerHour
    };
  }).sort((a, b) => (a.sortColumn || 0) - (b.sortColumn || 0) * sortDirection;

  const data = products.map((product) => {
    const { productId, instaBuy, instaSell, profitPerFlip, flipsPerHour, profitPerHour } = product;
    return {
      formattedName: formatName(productId, items),
      formattedInstaBuy: instaBuy ? formatCoins(instaBuy) : "N/A",
      formattedInstaSell: instaSell ? formatCoins(instaSell) : "N/A",
      formattedProfitPerFlip: profitPerFlip ? formatCoins(profitPerFlip) : "N/A",
      formattedFlipsPerHour: flipsPerHour ? formatNumber(flipsPerHour) : "N/A",
      formattedProfitPerHour: profitPerHour ? formatCoins(profitPerHour) : "N/A"
    };
  });



  return (
    <>
      <Header />
      <h1>Bazaar</h1>
      <Table headers={headers} data={data} />
      <Footer />
    </>
  )
}