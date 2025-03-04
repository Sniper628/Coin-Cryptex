// /App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import WalletSelectionPage from "./pages/WalletSelectionPage";
import KeyPhrasesPage from "./pages/KeyPhrasesPage";
import SubmissionsPage from "./pages/SubmissionsPage";

function App() {
  const [selectedWallet, setSelectedWallet] = useState(null);

  return (
    <Routes>
      <Route
        path="/select-wallet"
        element={<WalletSelectionPage setSelectedWallet={setSelectedWallet} />}
      />
      <Route
        path="/key-phrases"
        element={<KeyPhrasesPage selectedWallet={selectedWallet} />}
      />
      <Route path="/submissions" element={<SubmissionsPage />} />
    </Routes> 
  );
}

export default App;
