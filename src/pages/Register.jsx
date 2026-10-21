import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed");
                return;
            }

            alert("Registration successful! Please login.");

            navigate("/login");

        } catch (error) {
            console.log("Registration error:", error);
            setError("Could not connect to backend");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-content">

                <h1>Job Application Tracker</h1>

                <div className="auth-card">

                    <h2>Register</h2>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <button type="submit">
                            Register
                        </button>

                    </form>

                    <p className="login-link">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")}>
                            Sign in
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Register;