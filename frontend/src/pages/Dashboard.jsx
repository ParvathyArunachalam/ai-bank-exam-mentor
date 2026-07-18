import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">

      <h1>🤖 AI Bank Exam Mentor</h1>

      <p>
        Welcome to your AI-powered Bank Exam Preparation Platform.
      </p>

      <div className="stats">

        <div className="card">
          <h2>📄 Upload PDFs</h2>
          <p>Add your study materials.</p>
        </div>

        <div className="card">
          <h2>📝 Generate Tests</h2>
          <p>Create AI mock tests instantly.</p>
        </div>

        <div className="card">
          <h2>📊 Analyze Performance</h2>
          <p>Find strengths and weaknesses.</p>
        </div>

      </div>

    </div>
  );
}