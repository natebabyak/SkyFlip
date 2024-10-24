import { ReactNode, createContext, useEffect, useState } from 'react';

interface Item {
  material: string;
  durability: number;
  skin: string;
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

export const ItemsContext = createContext<ItemsData | null>(null);

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [itemsData, setItemsData] = useState<ItemsData | null>(null);

  async function fetchItemsData() {
    if (itemsData) return;
    const url = "https://api.hypixel.net/v2/resources/skyblock/items";
    const response = await fetch(url);
    setItemsData(await response.json());
  }

  useEffect(() => {
    fetchItemsData();
  });

  return (
    <ItemsContext.Provider value={itemsData}>
      {children}
    </ItemsContext.Provider>
  );
}