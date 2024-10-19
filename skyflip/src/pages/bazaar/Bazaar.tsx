import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer.tsx";
import Header from "../../components/header/Header.tsx";
import Table from "../../components/table/Table.tsx";
import formatCoins from "../../utils/formatCoins.ts";
import formatName from "../../utils/formatName.ts";
import formatNumber from "../../utils/formatNumber.ts";
import CopyButton from "../../components/copyButton/CopyButton.tsx";
import SortButton from "../../components/sortButton/SortButton.tsx";

const HOURS_IN_A_WEEK = 168;

interface Product {
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
}

interface BazaarData {
  success: boolean;
  lastUpdated: number;
  products: Product[];
}

interface Item {
  material: string;
  durability: number;
  skin: string
  name: string;
  category: string;
  tier: string;
  npc_sell_price: string;
  id: string;
}

interface ItemsData {
  success: boolean;
  lastUpdated: number;
  items: Item[];
}

type SortColumn = "instaBuy" | "instaSell" | "profitPerFlip" | "flipsPerHour" | "profitPerHour";
type SortDirection = -1 | 1;
type Tax = 0.01 | 0.01125 | 0.0125;

export default function Bazaar() {
  const [bazaarData, setBazaarData] = useState<BazaarData | null>(null);
  const [itemsData, setItemsData] = useState<ItemsData | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumn>("profitPerHour");
  const [sortDirection, setSortDirection] = useState<SortDirection>(-1);
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
  }, []);

  async function handleSort(columnClicked: SortColumn) {
    if (sortColumn === columnClicked) {
      setSortDirection(sortDirection === -1 ? 1 : -1);
    } else {
      setSortColumn(columnClicked);
      setSortDirection(-1);
    }
  }

  const headers = [
    "Item",
    <SortButton handleClick={() => handleSort("instaBuy")} text="Insta-Buy" state={sortColumn === "instaBuy" ? sortDirection === -1 ? "down" : "up" : "circle"} />,
    <SortButton handleClick={() => handleSort("instaSell")} text="Insta-Sell" state={sortColumn === "instaSell" ? sortDirection === -1 ? "down" : "up" : "circle"} />,
    <SortButton handleClick={() => handleSort("profitPerFlip")} text="Profit" state={sortColumn === "profitPerFlip" ? sortDirection === -1 ? "down" : "up" : "circle"} />,
    <SortButton handleClick={() => handleSort("flipsPerHour")} text="Flips/h" state={sortColumn === "flipsPerHour" ? sortDirection === -1 ? "down" : "up" : "circle"} />,
    <SortButton handleClick={() => handleSort("profitPerHour")} text="Coins/h" state={sortColumn === "profitPerHour" ? sortDirection === -1 ? "down" : "up" : "circle"} />
  ];

  const products = bazaarData ? Object.values(bazaarData.products).map((product) => {
    const { product_id, buy_summary, sell_summary, quick_status } = product;
    const { buyMovingWeek, sellMovingWeek } = quick_status;

    const productId = product_id;
    const instaBuy = buy_summary.length > 0 ? buy_summary[0].pricePerUnit : null;
    const instaSell = sell_summary.length > 0 ? sell_summary[0].pricePerUnit : null;
    const profitPerFlip = instaBuy && instaSell ? (instaBuy - 0.1) * (1 - tax) - (instaSell + 0.1) : null;
    const flipsPerHour = buyMovingWeek && sellMovingWeek ? 1 / (1 / (buyMovingWeek / HOURS_IN_A_WEEK) + 1 / (sellMovingWeek / HOURS_IN_A_WEEK)) : null;
    const profitPerHour = profitPerFlip && flipsPerHour ? profitPerFlip * flipsPerHour : null;

    return {
      productId,
      instaBuy,
      instaSell,
      profitPerFlip,
      flipsPerHour,
      profitPerHour
    };
  }).sort((a, b) => ((a[sortColumn] || 0) - (b[sortColumn] || 0)) * sortDirection) : null;

  const data = products ? products.map((product) => {
    const { productId, instaBuy, instaSell, profitPerFlip, flipsPerHour, profitPerHour } = product;
    const formattedName = itemsData ? formatName(productId, itemsData) : productId;
    return [
      <CopyButton buttonText={formattedName} copyText={"/bz ".concat(formattedName)} />,
      instaBuy ? formatCoins(instaBuy) : "N/A",
      instaSell ? formatCoins(instaSell) : "N/A",
      profitPerFlip ? formatCoins(profitPerFlip) : "N/A",
      flipsPerHour ? formatNumber(flipsPerHour) : "N/A",
      profitPerHour ? formatCoins(profitPerHour) : "N/A"
    ];
  }).filter((row) => row[5] !== "N/A") : null;

  if (!data) return <p>Loading...</p>

  return (
    <>
      <Header />
      <h1>Bazaar</h1>
      <Table headers={headers} data={data} />
      <Footer />
    </>
  )
}