const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "..", "data", "history.json");

// to load file
function loadHistory() {
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

// to save file
function saveHistory(history) {
  fs.writeFileSync(filePath, JSON.stringify(history, null, 2));
}

// GET: /api/history
router.get("/", (req, res) => {
  const history = loadHistory();
  res.json(history);
});

// POST: /api/history
// Add new unique city (on top)
router.post("/", (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: "City is required" });
  let history = loadHistory();
  // remove duplicates
  history = history.filter((c) => c.toLowerCase() !== city.toLowerCase());
  // add newest at top
  history.unshift(city);
  // optional limit
  if (history.length > 10) history = history.slice(0, 10);
  saveHistory(history);
  res.json({ success: true, history });
});

// DELETE: /api/history/:city
// Remove a city from search history
router.delete("/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  let history = loadHistory();
  // filter out city
  history = history.filter((c) => c.toLowerCase() !== city);
  saveHistory(history);
  res.json({ success: true, history });
});

module.exports = router;
