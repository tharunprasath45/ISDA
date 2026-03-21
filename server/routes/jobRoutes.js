const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
});

// get jobs by recruiter email
router.get("/recruiter/:email", async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiterEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch recruiter jobs",
      error: error.message,
    });
  }
});

// get single job by id
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch job",
      error: error.message,
    });
  }
});

// create new job
router.post("/", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
});

// delete job
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete job",
      error: error.message,
    });
  }
});

module.exports = router;