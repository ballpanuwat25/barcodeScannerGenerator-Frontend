import React from "react";
import BarcodeScanner from "./components/BarcodeScanner";
import BarcodeGenerator from "./components/BarcodeGenerator";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BarcodeScanner />} />
        <Route path="/generator" element={<BarcodeGenerator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
