const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

console.log("✅ RUNNING FILE:", __filename);
console.log("✅ PORT:", process.env.PORT);
console.log("✅ MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// applicants routes
app.use("/api/applicants", require("./routes/applicantRoutes"));

// jobs routes
app.use("/api/jobsdb", require("./routes/jobRoutes"));

// adzuna jobs API
app.get("/api/jobs", async (req, res) => {
  try {
    const what = req.query.what || "data analyst";
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const country = process.env.ADZUNA_COUNTRY || "in";
    const app_id = process.env.ADZUNA_APP_ID;
    const app_key = process.env.ADZUNA_APP_KEY;

    if (!app_id || !app_key) {
      return res.json({
        count: 1,
        results: [
          {
            title: `${what} Developer`,
            company: "Demo Company",
            location: "Remote",
            category: "IT",
            redirect_url: "https://example.com",
          },
        ],
      });
    }

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`;

    const response = await axios.get(url, {
      params: {
        app_id,
        app_key,
        what,
        results_per_page: limit,
      },
    });

    const results = (response.data.results || []).map((job) => ({
      title: job.title,
      company: job.company?.display_name || "Unknown Company",
      location: job.location?.display_name || "Unknown Location",
      category: job.category?.label || "General",
      created: job.created,
      description: job.description,
      redirect_url: job.redirect_url,
    }));

    return res.json({ count: results.length, results });
  } catch (err) {
    console.error("❌ Jobs API Error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});