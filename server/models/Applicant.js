const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
    },
    recruiterId: {
      type: String,
      required: true,
      trim: true,
    },
    recruiterEmail: {
      type: String,
      required: true,
      trim: true,
    },
    jobId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: "Unknown location",
      trim: true,
    },
    resumeName: {
      type: String,
      default: "",
      trim: true,
    },
    resumeData: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Applied", "Selected", "Rejected"],
      default: "Applied",
    },
    appliedAt: {
      type: String,
      default: () => new Date().toLocaleString(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applicant", applicantSchema);