import React from "react";
import KonyvekList from "./KonyvekList";
import KonyvekSinglePage from "./KonyvekSinglePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import UjKonyvFelvetel from "./UjKonyv";
import KonyTorles from "./KonyvTorles";
import KonyModositas from "./KonyvModositas";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<KonyvekList />} />
          <Route path="/konyv/:id" element={<KonyvekSinglePage />} />
          <Route path="/ujkonyv" element={<UjKonyvFelvetel/>} />
          <Route path="/modosit/:id" element={<KonyModositas/>} />
          <Route path="/torol/:id" element={<KonyTorles/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
