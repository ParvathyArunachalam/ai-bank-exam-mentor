import "./Navbar.css";

function Navbar() {
  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="navbar">
      <div className="welcome-section">
        <h2>👋 Welcome Back, Parvathy</h2>
        <p>{date}</p>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search anything..."
          />
        </div>

        <button className="icon-btn">🔔</button>

        <button className="icon-btn">🌙</button>

        <div className="avatar">
          PA
        </div>
      </div>
    </div>
  );
}

export default Navbar;