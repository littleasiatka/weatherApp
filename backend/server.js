// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const weatherRoutes = require("./routes/weather");
const historyRoutes = require("./routes/history");

const app = express();
const PORT = process.env.PORT || 4000;

const fs = require("fs");
const path = require("path");

// CLEAR HISTORY ON SERVER START
const historyPath = path.join(__dirname, "data/history.json");
fs.writeFileSync(historyPath, "[]"); // empty array

app.use(cors());
app.use(express.json());
app.use("/api/history", historyRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Weather routes
app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
