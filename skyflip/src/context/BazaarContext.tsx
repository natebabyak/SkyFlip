import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

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

interface BazaarContextType {
  bazaarData: BazaarData | null;
  setBazaarData: Dispatch<SetStateAction<BazaarData | null>>;
}

const BazaarContext = createContext<BazaarContextType | null>(null);

export const BazaarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [bazaarData, setBazaarData] = useState<BazaarData | null>(null);

  async function fetchBazaarData() {
    const url = "https://api.hypixel.net/v2/skyblock/bazaar";
    const response = await fetch(url);
    const json = await response.json();
    setBazaarData(json);
  }

  useEffect(() => {
    fetchBazaarData();
    const interval = setInterval(fetchBazaarData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BazaarContext.Provider value={{ bazaarData, setBazaarData }}>
      {children}
    </BazaarContext.Provider>
  );
};

export default BazaarContext;