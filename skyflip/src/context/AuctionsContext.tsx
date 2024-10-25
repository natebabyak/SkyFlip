import { ReactNode, createContext, useEffect, useState } from 'react';

interface Bid {
  auction_id: string;
  bidder: string;
  profile_id: string;
  amount: number;
  timestamp: number;
}

interface Auction {
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
  bids: Bid[];
  item_uuid: string;
}

interface AuctionsData {
  success: boolean;
  page: number;
  totalPages: number;
  totalAuctions: number;
  lastUpdated: number;
  auctions: Auction[];
}

export const AuctionsContext = createContext<AuctionsData | null>(null);

export function AuctionsProvider({ children }: { children: ReactNode }): JSX.Element {
  const [auctionsData, setAuctionsData] = useState<AuctionsData | null>(null);

  async function fetchAuctionsData(): Promise<void> {
    const url = 'https://api.hypixel.net/v2/skyblock/auctions';
    const response = await fetch(url);
    const data: AuctionsData = await response.json();
    for (let page = 1; page < data.totalPages; page++) {
      const pageUrl = `https://api.hypixel.net/v2/skyblock/auctions?PAGE=${page}`;
      const pageResponse = await fetch(pageUrl);
      const pageData: AuctionsData = await pageResponse.json();
      data.auctions.push(...pageData.auctions);
    }
    setAuctionsData(data);
  }

  useEffect(() => {
    fetchAuctionsData();
  }, []);

  return (
    <AuctionsContext.Provider value={auctionsData}>
      {children}
    </AuctionsContext.Provider>
  );
}