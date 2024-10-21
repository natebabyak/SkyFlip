import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer.tsx";
import Header from "../../components/header/Header.tsx";
import Table from "../../components/table/Table.tsx";
import formatCoins from "../../utils/formatCoins.ts";
import formatName from "../../utils/formatName.ts";
import formatNumber from "../../utils/formatNumber.ts";
import CopyButton from "../../components/copyButton/CopyButton.tsx";
import Loading from "../../components/loading/Loading.tsx";
import TaxButtons from "../../components/taxButtons/TaxButtons.tsx";

const HOURS_PER_WEEK = 168;

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

type Tax = 0.01 | 0.01125 | 0.0125;

export default function Bazaar() {
  const [bazaarData, setBazaarData] = useState<BazaarData | null>(null);
  const [itemsData, setItemsData] = useState<ItemsData | null>(null);
  const [tax, setTax] = useState<Tax>(0.01125);

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

  if (!bazaarData || !itemsData) return <Loading />

  const headers = [
    "Item",
    "Insta-Buy",
    "Insta-Sell",
    "Profit",
    "Flips/h",
    "Coins/h"
  ];

  const products = Object.values(bazaarData.products).map((product) => {
    const { product_id, buy_summary, sell_summary, quick_status } = product;
    const { buyMovingWeek, sellMovingWeek } = quick_status;
    const productId = product_id;
    const instaBuy = buy_summary.length > 0 ? buy_summary[0].pricePerUnit : null;
    const instaSell = sell_summary.length > 0 ? sell_summary[0].pricePerUnit : null;
    const profitPerFlip = instaBuy && instaSell ? (instaBuy - 0.1) * (1 - tax) - (instaSell + 0.1) : null;
    const flipsPerHour = buyMovingWeek && sellMovingWeek ? 1 / (1 / (buyMovingWeek / HOURS_PER_WEEK) + 1 / (sellMovingWeek / HOURS_PER_WEEK)) : null;
    const profitPerHour = profitPerFlip && flipsPerHour ? profitPerFlip * flipsPerHour : null;

    return {
      productId,
      instaBuy,
      instaSell,
      profitPerFlip,
      flipsPerHour,
      profitPerHour
    };
  }).sort((a, b) => ((b.profitPerHour || 0) - (a.profitPerHour || 0)));

  const data = products.map((product) => {
    const { productId, instaBuy, instaSell, profitPerFlip, flipsPerHour, profitPerHour } = product;
    const formattedName = formatName(productId, itemsData);

    return [
      <CopyButton buttonText={formattedName} copyText={`/bz ${formattedName}`} />,
      instaBuy ? formatCoins(instaBuy) : "N/A",
      instaSell ? formatCoins(instaSell) : "N/A",
      profitPerFlip ? formatCoins(profitPerFlip) : "N/A",
      flipsPerHour ? formatNumber(flipsPerHour) : "N/A",
      profitPerHour ? formatCoins(profitPerHour) : "N/A"
    ];
  }).filter((row) => row[5] !== "N/A");

  return (
    <>
      <Header />
      <h1>Bazaar</h1>
      <TaxButtons tax={tax} setTax={setTax} />
      <Table headers={headers} data={data} />
      <Footer />
    </>
  )
}