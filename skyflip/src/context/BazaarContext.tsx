import { ReactNode, createContext, useEffect, useState } from 'react';

interface SellSummary {
  amount: number;
  pricePerUnit: number;
  orders: number;
}

interface BuySummary {
  amount: number;
  pricePerUnit: number;
  orders: number;
}

interface QuickStatus {
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

interface Product {
  product_id: string;
  sell_summary: SellSummary[];
  buy_summary: BuySummary[];
  quick_status: QuickStatus;
}

interface BazaarData {
  success: boolean;
  lastUpdated: number;
  products: Product[];
}

export const BazaarContext = createContext<BazaarData | null>(null);

export function BazaarProvider({ children }: { children: ReactNode }) {
  const [bazaarData, setBazaarData] = useState<BazaarData | null>(null);

  async function fetchBazaarData() {
    const url = "https://api.hypixel.net/v2/skyblock/bazaar";
    const response = await fetch(url);
    setBazaarData(await response.json());
  }

  useEffect(() => {
    fetchBazaarData();
    const interval = setInterval(fetchBazaarData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BazaarContext.Provider value={bazaarData}>
      {children}
    </BazaarContext.Provider>
  );
}