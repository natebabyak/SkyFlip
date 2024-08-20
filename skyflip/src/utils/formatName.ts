const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

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

export default function formatName(id: string, itemsData: ItemsData): string {
  const item = itemsData.items.find((item) => item.id === id);
  const itemName = item ? item.name : id;

  if (itemName.startsWith("ENCHANTMENT_")) {
    const match = id.match(/^ENCHANTMENT(?:_ULTIMATE)?_(.+)_(\d+)$/);

    if (match) {
      const [, enchantment, level] = match;
      const romanLevel = ROMAN_NUMERALS[parseInt(level, 10) - 1];

      return `${enchantment.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase())} ${romanLevel}`;
    }
  }

  if (itemName.startsWith("ESSENCE_")) {
    return `${itemName.replace("ESSENCE_", "").toLowerCase().replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase())} Essence`;
  }

  if (itemName.startsWith("§")) {
    return itemName.slice(2);
  }

  return itemName;
};