import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        🤖 <span>AI Mentor</span>
      </div>

      <div className="menu">

        <NavLink to="/dashboard">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/upload">
          📄 Upload PDF
        </NavLink>

        <NavLink to="/documents">
          📚 Question Papers
        </NavLink>

        <NavLink to="/mock-tests">
          📝 My Mock Tests
        </NavLink>

        <NavLink to="/chat">
          🤖 Ask AI
        </NavLink>

        <NavLink to="/generate-test">
          ⚡ Generate Test
        </NavLink>

        <NavLink to="/performance">
          📊 Performance
        </NavLink>

        <NavLink to="/recommendation">
          🎯 Study Plan
        </NavLink>

      </div>

      <div className="sidebar-footer">

        <div className="user-card">

          <div className="user-avatar">
            PA
          </div>

          <div>

            <h4>Parvathy</h4>

            <p>Bank Aspirant</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;