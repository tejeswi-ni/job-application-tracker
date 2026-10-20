import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1>Job Application Tracker</h1>

                <p>
                    Track, organize, and manage your job applications
                    in one place.
                </p>

                <div className="landing-buttons">
                    <Link to="/login">
                        <button>Login</button>
                    </Link>

                    <Link to="/register">
                        <button>Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Landing;