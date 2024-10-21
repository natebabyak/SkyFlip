import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BazaarProvider } from './context/BazaarContext.tsx';
import { ItemsProvider } from './context/ItemsContext.tsx';
import Bazaar from './pages/bazaar/Bazaar.tsx';
import Corpses from './pages/corpses/Corpses.tsx';
import Home from './pages/home/Home.tsx';

export default function App() {
  return (
    <BazaarProvider>
      <ItemsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bazaar" element={<Bazaar />} />
            <Route path="/corpses" element={<Corpses />} />
          </Routes>
        </BrowserRouter>
      </ItemsProvider>
    </BazaarProvider>
  );
}