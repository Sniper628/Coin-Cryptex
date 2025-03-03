import React from "react";
import { useNavigate } from "react-router-dom";

// Ensure these images exist in your src/assets folder.
const wallets = [
  { name: "Metamask", icon: require("../assets/metamask.jpg") },
  { name: "Coinbase", icon: require("../assets/coinbase.jpg") },
  { name: "Defi Wallet", icon: require("../assets/defi.jpg") },
  { name: "Trust Wallet", icon: require("../assets/trust.jpg") },
];

const WalletSelectionPage = ({ setSelectedWallet }) => {
  const navigate = useNavigate();

  const handleWalletSelection = (wallet) => {
    // Save the entire wallet object (name and icon)
    setSelectedWallet(wallet);
    navigate("/key-phrases");
  };

  return (
    <div className="wallet-selection-container">
      <h2>Select Your Wallet</h2>
      <div className="wallets-grid">
        {wallets.map((wallet) => (
          <div
            key={wallet.name}
            className="wallet-card"
            onClick={() => handleWalletSelection(wallet)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={wallet.icon}
              alt={wallet.name}
              className="wallet-icon"
            />
            <p>{wallet.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletSelectionPage;
