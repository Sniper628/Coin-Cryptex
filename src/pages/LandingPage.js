import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleConnectWallet = () => {
    navigate("/select-wallet");
  };

  return (
    <div className="landing-page-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <p className="the-futer">The future of crypto in your pocket</p>
      </div>
      <div className="trade-send">
      <p className="trade-p">Trade, send, and store </p>
      <p className="crypto-and">CRYPTO & NFTs</p>
      </div>
      <p className="by-using-p">
        By using Coin Cryptex, you agree to 
      </p>
      <div className="by-div">
      <span
        className="terms"
        color="blue"
        > Terms </span>
        and 
        <span
        className="privacy"
        color="blue"
        > Privacy Policy</span>
      </div>

      <div className="last-div">
      <button className="connect-btn" onClick={handleConnectWallet}>Connect existing wallet</button>
      <p className="already">I already have a cryptex account</p>
      </div>
    </div>
  );
};

export default LandingPage;
