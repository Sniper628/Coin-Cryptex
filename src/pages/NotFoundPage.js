import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "3rem", color: "#FF0000" }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
        Page Not Available
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "red",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
