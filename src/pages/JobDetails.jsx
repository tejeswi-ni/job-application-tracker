import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./JobDetails.css";

function JobDetails({ editJob }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/applications/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setJob(data);
                }else {
                    console.log("Failed to fetch job:", response.status, data);
                }
            } catch (error) {
                console.log("Error fetching application:", error);
            }
        };

        fetchJob();
    }, [id]);

    return (
        <div className="job-details-container">

            <h1 className="job-details-title">
                Job Details
            </h1>

            {job ? (
                <div className="job-details-card">

                    <h2>{job.company}</h2>

                    <div className="job-detail">
                        <strong>Role</strong>
                        <span>{job.role}</span>
                    </div>

                    <div className="job-detail">
                        <strong>Location</strong>
                        <span>{job.location}</span>
                    </div>

                    <div className="job-detail">
                        <strong>Status</strong>
                        <span>{job.status}</span>
                    </div>

                    <div className="job-detail">
                        <strong>Date Applied</strong>
                        <span>
                            {new Date(job.dateApplied).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            })}
                        </span>
                    </div>

                    <div className="job-notes">
                        <strong>Notes</strong>
                        <p>
                            {job.notes || "No notes added."}
                        </p>
                    </div>

                    <div className="job-detail">
                        <strong>Job Link</strong>

                        {job.jobLink ? (
                            <a
                                className="job-link"
                                href={job.jobLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Job ↗
                            </a>
                        ) : (
                            <span className="no-link">
                                No job link provided.
                            </span>
                        )}
                    </div>

                    <div className="job-details-actions">
                        <button
                            className="details-edit-button"
                            onClick={() => editJob(job._id)}
                        >
                            Edit Application
                        </button>
                    </div>

                </div>
            ) : (
                <div className="job-details-card">
                    <h2>🔍 Application Not Found</h2>

                    <p>
                        This application doesn't exist or may have been deleted.
                    </p>

                    <button
                        className="details-edit-button"
                        onClick={() => navigate("/applications")}
                    >
                        Back to Applications
                    </button>
                </div>
            )}

        </div>
    );
}

export default JobDetails;