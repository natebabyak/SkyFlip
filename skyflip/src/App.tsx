import { BrowserRouter, Route, Routes } from "react-router-dom";

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
  );
}