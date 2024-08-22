import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer.tsx";
import Header from "../../components/header/Header.tsx";
import Table from "../../components/table/Table.tsx";
import formatCoins from "../../utils/formatCoins.ts";
import formatName from "../../utils/formatName.ts";
import formatNumber from "../../utils/formatNumber.ts";
import RefreshButton from "../../components/refreshButton/RefreshButton.tsx";

const HOURS_IN_A_WEEK = 168;

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
    }
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

type SortColumn = "name" | "instaBuy" | "instaSell" | "profitPerFlip" | "flipsPerHour" | "profitPerHour";
type SortDirection = "ascending" | "descending";
type Tax = 0.01 | 0.01125 | 0.0125;

export default function Bazaar() {
  const [bazaarData, setBazaarData] = useState<BazaarData | null>(null);
  const [itemsData, setItemsData] = useState<ItemsData | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumn>("profitPerHour");
  const [sortDirection, setSortDirection] = useState<SortDirection>("descending");
  const [tax, setTax] = useState<Tax>(0.01125);
  const [refresh, setRefresh] = useState(false);

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

    const interval = setInterval(fetchBazaarData, 60000);
    
    return () => clearInterval(interval);
  }, [refresh]);

  function handleRefresh() {
    setRefresh(!refresh);
  };

  <RefreshButton handleClick={handleRefresh} />
  const headers = [
    "Item",
    "Insta-Buy",
    "Insta-Sell",
    "Profit",
    "Flips/h",
    "Coins/h"
  ];

  const products = bazaarData ? Object.values(bazaarData.products).map((product) => {
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
      ? 1 / (1 / (buyMovingWeek / HOURS_IN_A_WEEK) + 1 / (sellMovingWeek / HOURS_IN_A_WEEK))
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
  }).sort((a, b) => {
    const aValue = a[sortColumn] ?? 0;
    const bValue = b[sortColumn] ?? 0;
    return (aValue - bValue) * sortDirection;
  }) : null;

  const data = products ? products.map((product) => {
    const { productId, instaBuy, instaSell, profitPerFlip, flipsPerHour, profitPerHour } = product;
    return {
      formattedName: itemsData ? formatName(productId, itemsData) : productId,
      formattedInstaBuy: instaBuy ? formatCoins(instaBuy) : "N/A",
      formattedInstaSell: instaSell ? formatCoins(instaSell) : "N/A",
      formattedProfitPerFlip: profitPerFlip ? formatCoins(profitPerFlip) : "N/A",
      formattedFlipsPerHour: flipsPerHour ? formatNumber(flipsPerHour) : "N/A",
      formattedProfitPerHour: profitPerHour ? formatCoins(profitPerHour) : "N/A"
    };
  }) : null;

  return (
    <>
      <Header />
      <h1>Bazaar</h1>
      <Table headers={headers} data={data} />
      <Footer />
    </>
  )
}