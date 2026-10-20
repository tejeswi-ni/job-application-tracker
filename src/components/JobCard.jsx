import "./JobCard.css";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import {
    FiEdit,
    FiTrash2,
    FiBriefcase,
    FiMapPin,
} from "react-icons/fi";
import StatusProgress from "./StatusProgress.jsx";

function JobCard({ job, deleteJob, editJob }) {
    const navigate = useNavigate();

    return (
        <div className={`job-card ${job.status.toLowerCase()}`}
            onClick={() => navigate(`/applications/${job._id}`)}
        >

            <h3>{job.company}</h3>

            <p>
                <FiBriefcase />
                <strong>Role:</strong> {job.role}
            </p>

            <p>
                <FiMapPin />
                <strong>Location:</strong> {job.location}
            </p>

            <p>
                <strong>Date Applied:</strong> {job.dateApplied}
            </p>

            <StatusBadge status={job.status} />

            <StatusProgress status={job.status} />

            <div className="job-actions">

                <button
                    type="button"
                    className="delete-button"
                    onClick={(e) =>{
                        e.stopPropagation();
                        deleteJob(job._id)
                    } }
                >
                    <FiTrash2 />
                    Delete
                </button>

                <button
                    type="button"
                    className="edit-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        editJob(job._id)
                    } }
                >
                    <FiEdit />
                    Edit
                </button>

            </div>

        </div>
    );
}

export default JobCard;