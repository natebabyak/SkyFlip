import { ReactNode, useContext } from 'react';
import Footer from '../../components/footer/Footer.tsx';
import Header from '../../components/header/Header.tsx';
import Loading from '../../components/loading/Loading.tsx';
import Table from '../../components/table/Table.tsx';
import { AuctionsContext } from '../../context/AuctionsContext.tsx';

export default function Auctions(): ReactNode {
  const auctionsData = useContext(AuctionsContext);

  if (!auctionsData) return <Loading />;

  const headers = [
    "Item",
    "lbin"
  ];

  const data = Object.values(auctionsData.auctions).map((auction) => {
    if (auction.bin) {
      return [
        auction.item_name,
        auction.starting_bid
      ];
    }
    return null;
  }).filter((auction) => auction !== null);

  return (
    <>
      <Header />
      <h1>Auctions</h1>
      <Table headers={headers} data={data} />
      <Footer />
    </>
  );
}