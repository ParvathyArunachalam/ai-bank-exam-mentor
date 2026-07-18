import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./RecommendationPage.css";

const API =
  "https://automatic-tribble-4j7wv445ww7rf7prp-8000.app.github.dev";

export default function RecommendationPage() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!state) return;

    loadRecommendation();

  }, []);

  const loadRecommendation = async () => {

    try {

      const res = await axios.post(
        `${API}/study-recommendation`,
        {
          filename: "chapter_4.pdf",
          topic: "Normalization",
          score: state.score,
          total: state.total,
          percentage: state.percentage,
        }
      );

      setRecommendation(res.data);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  if (loading) {

    return (

      <div className="recommendation-page">

        <h2>Loading Recommendation...</h2>

      </div>

    );

  }

  return (

    <div className="recommendation-page">

      <h1>📚 AI Study Recommendation</h1>

      <div className="recommendation-card">

        <div className="box">

          <h2>📉 Weak Topics</h2>

          <ul>

            {recommendation.weak_topics.map((item, index) => (

              <li key={index}>{item}</li>

            ))}

          </ul>

        </div>

        <div className="box">

          <h2>🎯 Recommended Topics</h2>

          <ul>

            {recommendation.recommended_topics.map((item, index) => (

              <li key={index}>{item}</li>

            ))}

          </ul>

        </div>

        <div className="stats">

          <div className="stat-card">
            <h3>⏱ Study Time</h3>
            <p>{recommendation.study_time}</p>
          </div>

          <div className="stat-card">
            <h3>❓ Practice Questions</h3>
            <p>{recommendation.practice_questions}</p>
          </div>

          <div className="stat-card">
            <h3>📈 Difficulty</h3>
            <p>{recommendation.difficulty}</p>
          </div>

          <div className="stat-card">
            <h3>📝 Next Mock Test</h3>
            <p>{recommendation.next_mock_test}</p>
          </div>

        </div>

        <div className="motivation">

          <h2>🚀 Motivation</h2>

          <p>{recommendation.motivation}</p>

        </div>

        <div className="buttons">

          <button
            className="dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            🏠 Dashboard
          </button>

          <button
            className="chat-btn"
            onClick={() => navigate("/chat")}
          >
            🤖 Ask AI Again
          </button>

        </div>

      </div>

    </div>

  );

}