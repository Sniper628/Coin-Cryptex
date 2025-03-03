import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css"; // or your global styles

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
