import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const API =
  "https://automatic-tribble-4j7wv445ww7rf7prp-8000.app.github.dev";

function Home() {
  const [dashboard, setDashboard] = useState({
    documents: 0,
    tests: 0,
    attempts: 0,
    average_score: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(`${API}/dashboard`);

      console.log("Dashboard:", res.data);

      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">

      <h1 className="dashboard-title">
        🤖 AI Bank Exam Mentor
      </h1>

      <p className="dashboard-subtitle">
        Your Personal AI Powered Learning Assistant
      </p>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>
            {loading ? "..." : dashboard.documents}
          </h2>
          <p>Uploaded PDFs</p>
        </div>

        <div className="stat-card">
          <h2>
            {loading ? "..." : dashboard.tests}
          </h2>
          <p>Generated Mock Tests</p>
        </div>

        <div className="stat-card">
          <h2>
            {loading
              ? "..."
              : `${dashboard.average_score}%`}
          </h2>
          <p>Average Score</p>
        </div>

        <div className="stat-card">
          <h2>
            {loading ? "..." : dashboard.attempts}
          </h2>
          <p>Tests Attempted</p>
        </div>

      </div>

      {/* Quick Actions */}

      <h2 className="section-title">
        Quick Actions
      </h2>

      <div className="actions-grid">

        <Link to="/upload" className="action-card">
          📄
          <h3>Upload PDF</h3>
          <p>Upload study material</p>
        </Link>

        <Link to="/chat" className="action-card">
          🤖
          <h3>Ask AI</h3>
          <p>Chat with your documents</p>
        </Link>

        <Link
          to="/generate-test"
          className="action-card"
        >
          📝
          <h3>Generate Test</h3>
          <p>Create AI Mock Test</p>
        </Link>

        <Link
          to="/mock-tests"
          className="action-card"
        >
          📚
          <h3>Take Test</h3>
          <p>Practice Existing Tests</p>
        </Link>

      </div>

      {/* Recent Activity */}

      <h2 className="section-title">
        Recent Activity
      </h2>

      <div className="activity-card">

        <div className="activity-item">
          📄 Total Uploaded PDFs :
          <strong> {dashboard.documents}</strong>
        </div>

        <div className="activity-item">
          📝 Total Mock Tests :
          <strong> {dashboard.tests}</strong>
        </div>

        <div className="activity-item">
          📊 Tests Attempted :
          <strong> {dashboard.attempts}</strong>
        </div>

        <div className="activity-item">
          🎯 Current Average :
          <strong> {dashboard.average_score}%</strong>
        </div>

      </div>

    </div>
  );
}

export default Home;