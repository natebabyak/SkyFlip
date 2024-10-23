import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuctionsProvider } from './context/AuctionsContext.tsx';
import { BazaarProvider } from './context/BazaarContext.tsx';
import { ItemsProvider } from './context/ItemsContext.tsx';
import Bazaar from './pages/bazaar/Bazaar.tsx';
import Corpses from './pages/corpses/Corpses.tsx';
import Home from './pages/home/Home.tsx';
import Auctions from './pages/auctions/Auctions.tsx';

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
              <Route path="/corpses" element={<Corpses />} />
            </Routes>
          </BrowserRouter>
        </ItemsProvider>
      </BazaarProvider>
    </AuctionsProvider>
  );
}