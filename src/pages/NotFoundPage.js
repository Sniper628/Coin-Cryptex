import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "3rem", color: "red" }}>404</h1>
      <p style={{ fontSize: "1.5rem" }}>Page Not Available</p>
      <button onClick={() => navigate("/")} style={{ fontSize: "1rem", padding: "10px" }}>
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
