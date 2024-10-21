import { ReactNode, createContext, useEffect, useState } from 'react';

interface ItemsData {
  success: boolean;
  lastUpdated: number;
  items: {
    material: string;
    durability: number;
    skin: string;
    name: string;
    category: string;
    tier: string;
    npc_sell_price: string;
    id: string;
  }[];
}

const ItemsContext = createContext<ItemsData | null>(null);

export function ItemsProvider({ children }: { children: ReactNode }): JSX.Element {
  const [itemsData, setItemsData] = useState<ItemsData | null>(null);

  async function fetchItemsData(): Promise<void> {
    if (itemsData) return;
    const url = "https://api.hypixel.net/v2/resources/skyblock/items";
    const response = await fetch(url);
    const data: ItemsData = await response.json();
    setItemsData(data);
  }

  useEffect(() => {
    fetchItemsData();
  });

  return (
    <ItemsContext.Provider value={itemsData}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;