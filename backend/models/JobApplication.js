const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    location: {
        type: String
    },

    status: {
        type: String,
        enum: ["Applied", "Screening", "Interview", "Offer", "Rejected"],
        default: "Applied"
    },

    dateApplied: {
        type: Date,
        required: true
    },

    jobLink: {
        type: String
    },

    notes: {
        type: String
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);