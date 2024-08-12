import { BrowserRouter, Route, Routes } from "react-router-dom"
import Bazaar from "./pages/bazaar/Bazaar.tsx"
import Home from "./pages/home/Home.tsx"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bazaar" element={<Bazaar />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}