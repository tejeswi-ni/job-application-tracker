import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import "./Applications.css";


function Applications({
    jobs,
    setJobs,
    editJob,
    deleteJob,
}) {
    const [searchJob, setSearchJob] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Oldest");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/applications`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.status === 401) {
                    setError("Session expired. Please login again.");
                    localStorage.removeItem("token");
                    return;
                }

                if (response.status === 403) {
                    setError("You are not allowed to access these applications.");
                    return;
                }

                if (!response.ok) {
                    setError(
                        data.message || "Failed to load applications."
                    );
                    return;
                }

                setJobs(data);

            } catch (error) {
                setError("Unable to connect to the server.");
                console.log("Error fetching applications:", error);

            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [setJobs]);

    const filteredJobs = jobs.filter((job) => {
        const search = searchJob.toLowerCase();

        const matchesStatus =
            statusFilter === "All" ||
            job.status === statusFilter;

        const matchesSearch =
            job.company.toLowerCase().includes(search) ||
            job.role.toLowerCase().includes(search) ||
            (job.location || "").toLowerCase().includes(search);

        return matchesStatus && matchesSearch;
    });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        switch (sortBy) {
            case "Newest":
                return new Date(b.dateApplied) -
                    new Date(a.dateApplied);

            case "Oldest":
                return new Date(a.dateApplied) -
                    new Date(b.dateApplied);

            case "A-Z":
                return a.company.localeCompare(b.company);

            case "Z-A":
                return b.company.localeCompare(a.company);

            default:
                return 0;
        }
    });

    return (
        <div className="applications-container">

            <h1 className="applications-title">
                Applications
            </h1>

            {/* Loading */}
            {loading && (
                <div className="empty-state">
                    <h2>Loading applications...</h2>
                    <p>Please wait.</p>
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="empty-state">
                    <h2>⚠️ {error}</h2>
                </div>
            )}

            {/* Applications */}
            {!loading && !error && (
                <>
                    {jobs.length > 0 && (
                        <div className="application-controls">

                            <div className="control-group">
                                <label htmlFor="status-filter">
                                    Filter by Status:
                                </label>

                                <select
                                    id="status-filter"
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                >
                                    <option value="All">All</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Screening">Screening</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Offer">Offer Letter</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <div className="control-group search-group">
                                <label htmlFor="job-search">
                                    Search Jobs:
                                </label>

                                <input
                                    type="text"
                                    id="job-search"
                                    value={searchJob}
                                    onChange={(e) =>
                                        setSearchJob(e.target.value)
                                    }
                                    placeholder="🔍 Search by company, role or location"
                                />
                            </div>

                            <div className="control-group">
                                <label htmlFor="sort-jobs">
                                    Sort By:
                                </label>

                                <select
                                    id="sort-jobs"
                                    value={sortBy}
                                    onChange={(e) =>
                                        setSortBy(e.target.value)
                                    }
                                >
                                    <option value="Newest">Newest</option>
                                    <option value="Oldest">Oldest</option>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                                </select>
                            </div>

                        </div>
                    )}

                    {/* No applications */}
                    {jobs.length === 0 ? (
                        <div className="empty-state">
                            <h2>📂 No applications yet</h2>

                            <p>
                                Start tracking your first job application
                            </p>

                            <button
                                onClick={() => navigate("/add-job")}
                            >
                                + Add Your First Application
                            </button>
                        </div>

                    ) : sortedJobs.length === 0 ? (

                        /* No search/filter results */
                        <div className="empty-state">
                            <h2>
                                📂 No matching applications found.
                            </h2>

                            <p>
                                Try changing your search or filter
                            </p>
                        </div>

                    ) : (

                        /* Application cards */
                        <div className="applications-list">
                            {sortedJobs.map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    editJob={editJob}
                                    deleteJob={deleteJob}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

        </div>
    );
}

export default Applications;