const express = require("express");
const JobApplication = require("../models/JobApplication");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET all applications
router.get("/", authMiddleware,async (req, res) => {
    try {
        const applications = await JobApplication.find(
            {userId: req.userId}
        );
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// GET single application
router.get("/:id", authMiddleware,async (req, res) => {
    try {
        const application = await JobApplication.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json(application);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch application"
        });
    }
});

// POST a new application
router.post("/", authMiddleware, async (req, res) => {
    try {
        const application = new JobApplication({
            ...req.body,
            userId: req.userId
        });

        const savedApplication = await application.save();

        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE application
router.put("/:id",authMiddleware, async (req, res) => {
    try {
        const application = await JobApplication.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.userId
            },
            req.body,
            { returnDocument: "after" }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json(application);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update application"
        });
    }
});


// DELETE application
router.delete("/:id",authMiddleware, async (req, res) => {
    try {
        const application = await JobApplication.findOneAndDelete(
            {
                _id: req.params.id,
                userId: req.userId
            }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json({
            message: "Application deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete application",
            error: error.message
        });
    }
});

module.exports = router;