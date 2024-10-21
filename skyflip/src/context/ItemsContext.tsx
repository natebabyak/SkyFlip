import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

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

interface ItemsContextType {
  itemsData: ItemsData | null;
  setItemsData: Dispatch<SetStateAction<ItemsData | null>>;
}

const ItemsContext = createContext<ItemsContextType | null>(null);

export const ItemsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [itemsData, setItemsData] = useState<ItemsData | null>(null);

  async function fetchItemsData() {
    const url = "https://api.hypixel.net/v2/resources/skyblock/items";
    const response = await fetch(url);
    const json = await response.json();
    setItemsData(json);
  }

  useEffect(() => {
    fetchItemsData();
  }, []);

  return (
    <ItemsContext.Provider value={{ itemsData, setItemsData }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;