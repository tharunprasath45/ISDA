const express = require("express");
const router = express.Router();
const Applicant = require("../models/Applicant");

// get applicants by recruiter email
router.get("/recruiter/:email", async (req, res) => {
  try {
    const applicants = await Applicant.find({
      recruiterEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch recruiter applicants",
      error: error.message,
    });
  }
});

// get applied jobs by user email
router.get("/user/:email", async (req, res) => {
  try {
    const applicants = await Applicant.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user applied jobs",
      error: error.message,
    });
  }
});

// get all applicants
router.get("/", async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applicants",
      error: error.message,
    });
  }
});

// get single applicant by id
router.get("/:id", async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.status(200).json(applicant);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applicant",
      error: error.message,
    });
  }
});

// create applicant
router.post("/", async (req, res) => {
  try {
    console.log("Applicant payload:", req.body);

    const newApplicant = new Applicant(req.body);
    const savedApplicant = await newApplicant.save();

    res.status(201).json(savedApplicant);
  } catch (error) {
    console.error("Create applicant error:", error);

    res.status(400).json({
      message: "Failed to create applicant",
      error: error.message,
      details: error.errors || null,
    });
  }
});

// update applicant status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Applied", "Selected", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedApplicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedApplicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.status(200).json(updatedApplicant);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update status",
      error: error.message,
    });
  }
});

// delete applicant
router.delete("/:id", async (req, res) => {
  try {
    const deletedApplicant = await Applicant.findByIdAndDelete(req.params.id);

    if (!deletedApplicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.status(200).json({ message: "Applicant deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete applicant",
      error: error.message,
    });
  }
});

module.exports = router;