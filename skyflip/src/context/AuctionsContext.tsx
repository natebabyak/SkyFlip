import { ReactNode, createContext, useEffect, useState } from 'react';

interface AuctionsData {
  success: boolean;
  page: number;
  totalPages: number;
  totalAuctions: number;
  lastUpdated: number;
  auctions: {
    uuid: string;
    auctioneer: string;
    profile_id: string;
    coop: string[];
    start: number;
    end: number;
    item_name: string;
    item_lore: string;
    category: string;
    tier: string;
    starting_bid: string;
    item_bytes: string;
    claimed: boolean;
    claimed_bidders: null;
    highest_bid_amount: number;
    last_updated: number;
    bin: boolean;
    bids: {
      auction_id: string;
      bidder: string;
      profile_id: string;
      amount: number;
      timestamp: number;
    }[];
    item_uuid: string;
  }[];
}

const AuctionsContext = createContext<AuctionsData | null>(null);

export function AuctionsProvider({ children }: { children: ReactNode }): ReactNode {
  const [auctionsData, setAuctionsData] = useState<AuctionsData | null>(null);

  async function fetchAuctionsData(): Promise<void> {
    const url = "https://api.hypixel.net/v2/skyblock/auctions";
    const response = await fetch(url);
    const data: AuctionsData = await response.json();
    setAuctionsData(data);
  }

  useEffect(() => {
    fetchAuctionsData();
    const interval = setInterval(fetchAuctionsData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuctionsContext.Provider value={auctionsData}>
      {children}
    </AuctionsContext.Provider>
  );
};

export default AuctionsContext;