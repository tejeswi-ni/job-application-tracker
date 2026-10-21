import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ darkMode, setDarkMode }) {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        setMenuOpen(false);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">

            <h2 className="navbar-title">
                Job Application Tracker
            </h2>

            <button
                className="menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? "✕" : "☰"}
            </button>

            <div className={`nav-links ${menuOpen ? "menu-open" : ""}`}>

                <button onClick={closeMenu}>
                    <Link to="/home">Home</Link>
                </button>

                <button onClick={closeMenu}>
                    <Link to="/applications">Applications</Link>
                </button>

                <button onClick={closeMenu}>
                    <Link to="/add-job">Add Job</Link>
                </button>

                <button
                    onClick={() => {
                        setDarkMode(!darkMode);
                        closeMenu();
                    }}
                >
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