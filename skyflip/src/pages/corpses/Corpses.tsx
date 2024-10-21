import Header from "../../components/header/Header.tsx";
import Footer from "../../components/footer/Footer.tsx";
import { ReactNode, useEffect, useState } from "react";
import Table from "../../components/table/Table.tsx";
import corpsesData from "./corpsesData.json";
import Loading from "../../components/loading/Loading.tsx";

interface BazaarData {
  success: boolean;
  lastUpdated: number;
  products: {
    product_id: string;
    sell_summary: {
      amount: number;
      pricePerUnit: number;
      orders: number;
    }[];
    buy_summary: {
      amount: number;
      pricePerUnit: number;
      orders: number;
    }[];
    quick_status: {
      productId: string;
      sellPrice: number;
      sellVolume: number;
      sellMovingWeek: number;
      sellOrders: number;
      buyPrice: number;
      buyVolume: number;
      buyMovingWeek: number;
      buyOrders: number;
    };
  }[];
}

interface ItemsData {
  success: boolean;
  lastUpdated: number;
  items: {
    material: string;
    durability: number;
    skin: string
    name: string;
    category: string;
    tier: string;
    npc_sell_price: string;
    id: string;
  }[];
}

export default function Corpses(): ReactNode {
  const [bazaarData, setBazaarData] = useState<BazaarData | null>(null);
  const [itemsData, setItemsData] = useState<ItemsData | null>(null);

  async function fetchBazaarData() {
    const url = "https://api.hypixel.net/v2/skyblock/bazaar";
    const response = await fetch(url);
    const json = await response.json();
    setBazaarData(json);
  }

  async function fetchItemsData() {
    const url = "https://api.hypixel.net/v2/resources/skyblock/items";
    const response = await fetch(url);
    const json = await response.json();
    setItemsData(json);
  }

  useEffect(() => {
    fetchBazaarData();
    fetchItemsData();

    const interval = setInterval(fetchBazaarData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!bazaarData || !itemsData || !corpsesData) return <Loading />

  const headers = [
    "Image",
    "Name",
    "Cost",
    "Revenue",
    "Profit"
  ];
  /*
  const data = Object.values(corpsesData.corpses).map((corpse) => {
    const { imageUrl, name, key, numDrops, totalWeight, dyeChance, drops } = corpse;
    const image = <img src={imageUrl} alt={name} />;
    const cost = bazaarData.products.find((product) => product.product_id === key)?.buy_summary[0].pricePerUnit;
    const revenue = 1;
    const profit = 1;

    return {
      image,
      name,
      cost,
      revenue,
      profit
    };
  });
  */
  return (
    <>
      <Header />
      <h1>Frozen Corpses</h1>
      <Table headers={headers} data={data} />
      <Footer />
    </>
  )
}