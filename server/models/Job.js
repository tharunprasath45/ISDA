const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: String,
      required: true,
    },
    recruiterEmail: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "Unknown location",
    },
    employmentType: {
      type: String,
      default: "",
    },
    experienceLevel: {
      type: String,
      default: "",
    },
    minSalary: {
      type: Number,
      default: 0,
    },
    maxSalary: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    requirements: {
      type: String,
      default: "",
    },
    companyWebsite: {
      type: String,
      default: "",
    },
    aboutCompany: {
      type: String,
      default: "",
    },
    postedAt: {
      type: String,
      default: () => new Date().toLocaleString(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);