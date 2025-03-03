import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";


const LandingPage = () => {
  const navigate = useNavigate();

  const handleConnectWallet = () => {
    navigate("/select-wallet");
  };

  return (
    <>
  
    <div className="landing-page-container">
    <div className="logo-container">
    <img src={logo} alt="Logo" className="logo" />
  </div>
      <h1>COIN CRYPTEX</h1>
      <p>The future of crypto in your pocket</p>
      <p>Trade, send, and store CRYPTO & NFTs</p>
      <p>
        By using Coin Cryptex, you agree to the{" "}
        <button
          onClick={() => alert("No Terms page available")}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Terms
        </button>{" "}
        and{" "}
        <button
          onClick={() => alert("No Privacy page available")}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Privacy
        </button>
        .
      </p>

      <button onClick={handleConnectWallet}>
        Connect existing wallet
      </button>

      <button>I already have a cryptex account</button>
    </div>
    </>
  );
};



export default LandingPage;
