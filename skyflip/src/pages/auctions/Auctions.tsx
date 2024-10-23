import { ReactNode, useContext } from 'react';
import Footer from '../../components/footer/Footer.tsx';
import Header from '../../components/header/Header.tsx';
import Loading from '../../components/loading/Loading.tsx';
import Table from '../../components/table/Table.tsx';
import AuctionsContext from '../../context/AuctionsContext.tsx';

export default function Bazaar(): ReactNode {
  const auctionsData = useContext(AuctionsContext);

  if (!auctionsData) return <Loading />;

  const headers = [
    "Item",
    "Price"
  ];

  let data: ReactNode[][] = []; // Initialize the array

  // Create a Map to store the minimum price for each unique item name
  const lowestPriceMap = new Map<string, number>();

  for (let i = 0; i < auctionsData.totalPages; i++) {
    // Iterate over each auction and find the lowest price for each unique item name
    auctionsData.auctions.forEach((auction) => {
      if (auction.bin) {
        const itemName = auction.item_name;
        const startingBid = auction.starting_bid;

        // Check if the item is already in the map
        if (lowestPriceMap.has(itemName)) {
          // Update the price if the current starting bid is lower than the stored price
          if (startingBid as unknown as number < lowestPriceMap.get(itemName)!) {
            lowestPriceMap.set(itemName, startingBid as unknown as number);
          }
        } else {
          // If item is not in the map, add it
          lowestPriceMap.set(itemName, startingBid as unknown as number);
        }
      }
    });
    auctionsData.page++;
  }

  // Convert the Map entries to an array of arrays
  data = Array.from(lowestPriceMap.entries()).map(([name, price]) => [name, price]);

  return (
    <>
      <Header />
      <h1>Auctions</h1>
      <Table headers={headers} data={data} />
      <Footer />
    </>
  );
}