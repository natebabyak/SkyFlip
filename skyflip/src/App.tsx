import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bazaar from './pages/bazaar/Bazaar.tsx';
import Home from './pages/home/Home.tsx';
import Corpses from './pages/corpses/Corpses.tsx';
import { BazaarProvider } from './context/BazaarContext.tsx';
import { ItemsProvider } from './context/ItemsContext.tsx';

export default function App() {
  return (
    <ItemsProvider>
      <BazaarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bazaar" element={<Bazaar />} />
            <Route path="/bazaar" element={<Corpses />} />
          </Routes>
        </BrowserRouter>
      </BazaarProvider>
    </ItemsProvider>
  )
}