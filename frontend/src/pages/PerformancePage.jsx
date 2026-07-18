import { useLocation } from "react-router-dom";

function PerformancePage() {
  const { state } = useLocation();

  if (!state) {
    return <h2>No Performance Data Found</h2>;
  }

  const { evaluation, performance, recommendation } = state;

  return (
    <div className="container">

      <h1>Performance Analysis</h1>

      <h2>
        Score : {evaluation.score} / {evaluation.total}
      </h2>

      <h2>
        Percentage : {evaluation.percentage}%
      </h2>

      <hr />

      <h2>Overall Feedback</h2>

      <p>{performance.overall_feedback}</p>

      <hr />

      <h2>Strengths</h2>

      <ul>
        {performance.strengths.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr />

      <h2>Weaknesses</h2>

      <ul>
        {performance.weaknesses.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr />

      <h2>Study Plan</h2>

      <ul>
        {performance.study_plan.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr />

      <h2>Recommended Topics</h2>

      <ul>
        {recommendation.recommended_topics.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr />

      <h2>Weak Topics</h2>

      <ul>
        {recommendation.weak_topics.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr />

      <h2>Study Time</h2>

      <p>{recommendation.study_time}</p>

      <h2>Practice Questions</h2>

      <p>{recommendation.practice_questions}</p>

      <h2>Difficulty</h2>

      <p>{recommendation.difficulty}</p>

      <h2>Next Mock Test</h2>

      <p>{recommendation.next_mock_test}</p>

      <hr />

      <h2>Motivation</h2>

      <p>{recommendation.motivation}</p>

    </div>
  );
}

export default PerformancePage;