const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://isda-sigma.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

app.use("/api/applicants", require("./routes/applicantRoutes"));
app.use("/api/jobsdb", require("./routes/jobRoutes"));

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
  console.log(`🔥 Server running on port ${PORT}`);
});