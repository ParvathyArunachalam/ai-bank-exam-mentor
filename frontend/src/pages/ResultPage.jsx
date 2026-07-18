import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css";

export default function ResultPage() {

    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="result-page">
                <h2>No Result Found</h2>
            </div>
        );
    }

    const { score, total, percentage, results } = state;

    return (

        <div className="result-page">

            <div className="result-card">

                <h1>🎉 Test Completed</h1>

                <div className="score-circle">

                    <h2>{percentage}%</h2>

                </div>

                <h3>
                    Score : {score} / {total}
                </h3>

                <div className="summary">

                    <div className="correct">
                        ✅ Correct : {score}
                    </div>

                    <div className="wrong">
                        ❌ Wrong : {total - score}
                    </div>

                </div>

                <h2 className="review-title">
                    Answer Review
                </h2>

                <div className="review-list">

                    {results.map((item, index) => (

                        <div
                            key={index}
                            className={`review-card ${item.correct ? "correct-card" : "wrong-card"
                                }`}
                        >

                            <h4>
                                Q{index + 1}. {item.question}
                            </h4>

                            <p>
                                <strong>Your Answer:</strong>
                                {" "}
                                {item.student_answer || "Not Answered"}
                            </p>

                            <p>
                                <strong>Correct Answer:</strong>
                                {" "}
                                {item.correct_answer}
                            </p>

                        </div>

                    ))}

                </div>

                <div className="buttons">

                    <button
                        className="performance-btn"
                        onClick={() =>
                            navigate("/performance", {
                                state,
                            })
                        }
                    >
                        📊 Performance Analysis
                    </button>

                    <button
                        className="dashboard-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        🏠 Dashboard
                    </button>

                </div>

            </div>

        </div>

    );

}