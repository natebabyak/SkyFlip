import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuctionsProvider } from './context/AuctionsContext.tsx';
import { BazaarProvider } from './context/BazaarContext.tsx';
import { ItemsProvider } from './context/ItemsContext.tsx';
import Auctions from './pages/auctions/Auctions.tsx';
import Bazaar from './pages/bazaar/Bazaar.tsx';
import Bits from './pages/bits/Bits.tsx';
import Copper from './pages/copper/Copper.tsx';
import Corpses from './pages/corpses/Corpses.tsx';
import Crafts from './pages/crafts/Crafts.tsx';
import Fann from './pages/fann/Fann.tsx';
import Forge from './pages/forge/Forge.tsx';
import Home from './pages/home/Home.tsx';
import Kat from './pages/kat/Kat.tsx';
import Pets from './pages/pets/Pets.tsx';

export default function App() {
  return (
    <AuctionsProvider>
      <BazaarProvider>
        <ItemsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auctions" element={<Auctions />} />
              <Route path="/bazaar" element={<Bazaar />} />
              <Route path="/bits" element={<Bits />} />
              <Route path="/copper" element={<Copper />} />
              <Route path="/corpses" element={<Corpses />} />
              <Route path="/crafts" element={<Crafts />} />
              <Route path="/fann" element={<Fann />} />
              <Route path="/forge" element={<Forge />} />
              <Route path="/kat" element={<Kat />} />
              <Route path="/pets" element={<Pets />} />
            </Routes>
          </BrowserRouter>
        </ItemsProvider>
      </BazaarProvider>
    </AuctionsProvider>
  );
}