import { ReactNode, createContext, useEffect, useState } from 'react';

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

const BazaarContext = createContext<BazaarData | null>(null);

export function BazaarProvider({ children }: { children: ReactNode }): JSX.Element {
  const [bazaarData, setBazaarData] = useState<BazaarData | null>(null);

  async function fetchBazaarData(): Promise<void> {
    const url = "https://api.hypixel.net/v2/skyblock/bazaar";
    const response = await fetch(url);
    const data: BazaarData = await response.json();
    setBazaarData(data);
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
};

export default BazaarContext;