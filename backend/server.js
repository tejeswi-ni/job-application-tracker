const dns = require("dns");
dns.setServers(["1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const applicationRoutes = require("./routes/applications");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/applications", applicationRoutes);
app.use("/", authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

app.get("/", (req, res) => {
    res.send("Job Tracker Backend is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});