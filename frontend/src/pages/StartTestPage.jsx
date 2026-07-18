import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StartTestPage.css";

const API =
  "https://automatic-tribble-4j7wv445ww7rf7prp-8000.app.github.dev";

function StartTestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    loadTest();
  }, []);

  const loadTest = async () => {
    try {
      const res = await axios.get(`${API}/mock-tests/${id}`);
      setTest(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load test.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="start-test-container">
        <h2>Loading Test...</h2>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="start-test-container">
        <h2>Test Not Found</h2>
      </div>
    );
  }

  const questions = test.questions_json || [];

  if (questions.length === 0) {
    return (
      <div className="start-test-container">
        <h2>No Questions Available</h2>
      </div>
    );
  }

  const q = questions[currentQuestion];

  const handleOptionChange = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitTest = async () => {
    try {
      const payload = {
        answers: questions.map((q, index) => ({
          question: q.question,
          student_answer: answers[index] || "",
          correct_answer: q.answer,
        })),
      };

      console.log("Submitting Answers:", payload);

      // STEP 1 - Evaluate Test
      const evaluation = await axios.post(
        `${API}/submit-test`,
        payload
      );

      console.log("Evaluation:", evaluation.data);

      // STEP 2 - Performance Analysis
      const performance = await axios.post(
        `${API}/performance-analysis`,
        {
          score: evaluation.data.score,
          total: evaluation.data.total,
          percentage: evaluation.data.percentage,
          results: evaluation.data.results,
        }
      );

      console.log("Performance:", performance.data);

      // STEP 3 - Study Recommendation
      const recommendation = await axios.post(
        `${API}/study-recommendation`,
        {
          filename: test.title,
          topic: test.title,
          score: evaluation.data.score,
          total: evaluation.data.total,
          percentage: evaluation.data.percentage,
        }
      );

      console.log("Recommendation:", recommendation.data);

      // STEP 4 - Save Result
      await axios.post(`${API}/save-result`, {
        student_id: "student1",
        filename: test.title,
        topic: test.title,
        score: evaluation.data.score,
        total: evaluation.data.total,
        percentage: evaluation.data.percentage,
      });

      console.log("Result Saved");

      // STEP 5 - Navigate
      navigate("/performance", {
        state: {
          evaluation: evaluation.data,
          performance: performance.data,
          recommendation: recommendation.data,
        },
      });
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(err.response.data);
      }

      alert("Unable to submit test.");
    }
  };

  return (
    <div className="start-test-container">
      <h1>{test.title}</h1>

      <div className="question-card">
        <h3>
          Question {currentQuestion + 1} / {questions.length}
        </h3>

        <p className="question-text">{q.question}</p>

        <div className="options">
          {q.options.map((option, index) => (
            <label className="option" key={index}>
              <input
                type="radio"
                checked={answers[currentQuestion] === option}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button onClick={nextQuestion}>Next</button>
        ) : (
          <button
            className="submit-btn"
            onClick={submitTest}
          >
            Submit Test
          </button>
        )}
      </div>

      <div className="question-numbers">
        {questions.map((_, index) => (
          <button
            key={index}
            className={
              currentQuestion === index
                ? "active-question"
                : ""
            }
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StartTestPage;