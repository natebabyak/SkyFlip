import { ReactNode, createContext, useEffect, useState } from 'react';

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
  bids: {
    auction_id: string;
    bidder: string;
    profile_id: string;
    amount: number;
    timestamp: number;
  }[];
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

const AuctionsContext = createContext<Auction[] | null>(null);

export function AuctionsProvider({ children }: { children: ReactNode }): JSX.Element {
  const [auctionsData, setAuctionsData] = useState<Auction[] | null>(null);

  async function fetchAuctionsData(): Promise<void> {
    const combinedData: Auction[] = [];
    const initialUrl = "https://api.hypixel.net/v2/skyblock/auctions";

    try {
      // Fetch the initial page to get the total number of pages
      const initialResponse = await fetch(initialUrl);
      const initialData: AuctionsData = await initialResponse.json();

      // Add initial page data
      combinedData.push(...initialData.auctions);

      // Fetch the remaining pages
      for (let page = 1; page < initialData.totalPages; page++) {
        const pageUrl = `${initialUrl}?page=${page}`;
        const pageResponse = await fetch(pageUrl);
        const pageData: AuctionsData = await pageResponse.json();

        // Add current page's auctions to the combined data
        combinedData.push(...pageData.auctions);
      }

      // Set the combined auctions data to state
      setAuctionsData(combinedData);
    } catch (error) {
      console.error("Error fetching auctions data:", error);
    }
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

export default AuctionsContext;
