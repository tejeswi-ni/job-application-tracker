import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddJob from "./pages/AddJob";
import Landing from "./pages/Landing";
import Applications from "./pages/Applications";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import JobDetails from "./pages/JobDetails";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    const [jobs, setJobs] = useState([]);

    const [selectedJob, setSelectedJob] = useState(null);

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const location = useLocation();

    const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

    useEffect( () => {
        document.body.className = darkMode ? "dark" : "light";
        localStorage.setItem("theme",darkMode ? "dark": "light");
    },[darkMode]);


    const navigate = useNavigate();

    function editJob(jobId) {
        const job = jobs.find((job) => job._id === jobId);
        setSelectedJob(job);
        navigate("/add-job");
    }

    async function deleteJob(jobId) {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/applications/${jobId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (response.status === 403) {
                alert("You are not allowed to delete this application.");
                return;
            }

            if (!response.ok) {
                alert(data.message || "Failed to delete application");
                return;
            }

            setJobs((prevJobs) =>
                prevJobs.filter((job) => job._id !== jobId)
            );

            if (selectedJob?._id === jobId) {
                setSelectedJob(null);
            }

        } catch (error) {
            console.log("Error deleting application:", error);
            alert("Could not connect to backend");
        }
    }

    return (
        <>
            {!hideNavbar && (
                <Navbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
            )}
                            

        <Routes>

            <Route 
                path="/register" 
                element={<Register />} 
            />

            <Route 
                path="/login" 
                element={<Login />} 
            />

            <Route
                path="/"
                element={
                    <Landing/>
                }
            />

            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home jobs={jobs} />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/applications"
                element={
                    <ProtectedRoute>
                        <Applications
                            jobs={jobs}
                            setJobs={setJobs}
                            editJob={editJob}
                            deleteJob={deleteJob}
                        />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/add-job"
                element={
                    <ProtectedRoute>
                        <AddJob
                            jobs={jobs}
                            setJobs={setJobs}
                            selectedJob={selectedJob}
                            setSelectedJob={setSelectedJob}
                        />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/applications/:id"
                element={
                    <ProtectedRoute>
                        <JobDetails
                            jobs={jobs}
                            editJob={editJob}
                        />
                    </ProtectedRoute>
                }
            />

        </Routes>
        </>
    );
}

export default App;