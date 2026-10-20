import "./AddJob.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialFormData = {
    company: "",
    role: "",
    location: "",
    status: "Applied",
    dateApplied: "",
    jobLink: "",
    notes: "",
};

function AddJob({
    jobs,
    setJobs,
    selectedJob,
    setSelectedJob,
}) {
    const [formData, setFormData] = useState(initialFormData);

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.company.trim()) {
            newErrors.company = "*Company name is required";
        }

        if (!formData.role.trim()) {
            newErrors.role = "*Job role is required";
        }

        if (!formData.location.trim()) {
            newErrors.location = "*Job location is required";
        }

        if (!formData.dateApplied) {
            newErrors.dateApplied = "*Date applied is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            const token = localStorage.getItem("token");

            let response;

            if (selectedJob) {
                // UPDATE existing application
                response = await fetch(
                    `${import.meta.env.VITE_API_URL}/applications/${selectedJob._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(formData),
                    }
                );
            } else {
                // ADD new application
                response = await fetch(
                    `${import.meta.env.VITE_API_URL}/applications`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(formData),
                    }
                );
            }

            const data = await response.json();

            // Unauthorized
            if (response.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            // Forbidden
            if (response.status === 403) {
                alert("You are not allowed to modify this application.");
                return;
            }

            if (!response.ok) {
                alert(data.message || "Failed to save application");
                return;
            }

            if (selectedJob) {
                setJobs((prevJobs) =>
                    prevJobs.map((job) =>
                        job._id === selectedJob._id ? data : job
                    )
                );

                setSelectedJob(null);
            } else {
                setJobs((prevJobs) => [...prevJobs, data]);
            }

            setFormData(initialFormData);
            navigate("/applications");

        } catch (error) {
            console.log("Error:", error);
            alert("Could not connect to backend");
        }
    };

    const handleCancelEdit = () => {
        setFormData(initialFormData);
        setSelectedJob(null);
    };

    useEffect(() => {
        if (selectedJob) {
            setFormData(selectedJob);
        } else {
            setFormData(initialFormData);
        }
    }, [selectedJob]);

    return (
        <div className="job-container">

            <h1>
                {selectedJob
                    ? "Edit Job Application"
                    : "Add Job Application"}
            </h1>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="companyname">
                        Company Name:
                    </label>

                    <input
                        type="text"
                        name="company"
                        id="companyname"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enter company's name..."
                        required
                    />

                    {errors.company && (
                        <p className="error-message">
                            {errors.company}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="jobrole">
                        Job Role:
                    </label>

                    <input
                        type="text"
                        name="role"
                        id="jobrole"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Enter your job role"
                        required
                    />

                    {errors.role && (
                        <p className="error-message">
                            {errors.role}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="location">
                        Job Location:
                    </label>

                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter job's location"
                        required
                    />

                    {errors.location && (
                        <p className="error-message">
                            {errors.location}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="status">
                        Job Status:
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Applied">Applied</option>
                        <option value="Screening">Screening</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer Letter</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="applicationdate">
                        Date Applied:
                    </label>

                    <input
                        type="date"
                        name="dateApplied"
                        id="applicationdate"
                        value={formData.dateApplied}
                        onChange={handleChange}
                    />

                    {errors.dateApplied && (
                        <p className="error-message">
                            {errors.dateApplied}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="joblink">
                        Job Link:
                    </label>

                    <input
                        type="url"
                        name="jobLink"
                        id="joblink"
                        value={formData.jobLink}
                        onChange={handleChange}
                        placeholder="Enter job's link (Eg: https://...)"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">
                        Notes:
                    </label>

                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Enter your job notes"
                    />
                </div>

                <button
                    type="submit"
                    className="add-job-button"
                >
                    {selectedJob ? "Update Job" : "Add Job"}
                </button>

                {selectedJob && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="add-job-button"
                    >
                        Cancel Edit
                    </button>
                )}

            </form>
        </div>
    );
}

export default AddJob;
