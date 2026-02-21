const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());

// ✅ Debug: confirm which file is running + which port
console.log("✅ RUNNING FILE:", __filename);
console.log("✅ PORT:", process.env.PORT);
console.log("✅ MONGO_URI:", process.env.MONGO_URI);

// ✅ MongoDB (use the correct env key)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// ✅ IMPORTANT: this route MUST exist
app.get("/api/jobs", async (req, res) => {
  try {
    const what = req.query.what || "data analyst";
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    // If you have Adzuna keys, it will fetch real jobs
    const country = process.env.ADZUNA_COUNTRY || "in";
    const app_id = process.env.ADZUNA_APP_ID;
    const app_key = process.env.ADZUNA_APP_KEY;

    // ✅ If keys missing, return demo data (prevents errors)
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
      params: { app_id, app_key, what, results_per_page: limit },
    });

    const results = (response.data.results || []).map((job) => ({
      title: job.title,
      company: job.company?.display_name,
      location: job.location?.display_name,
      category: job.category?.label,
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
app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));
