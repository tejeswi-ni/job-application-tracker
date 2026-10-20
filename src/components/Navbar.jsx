import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2 className="navbar-title">
        Job Application Tracker
      </h2>

      <div className="nav-links">

        <button>
          <Link to="/home">Home</Link>
        </button>

        <button>
          <Link to="/applications">Applications</Link>
        </button>

        <button>
          <Link to="/add-job">Add Job</Link>
        </button>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
            className="logout-button"
            onClick={handleLogout}
        >
            Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;