// backend/routes/weather.js
const express = require("express");
const router = express.Router();
const {
  fetchCurrentWeather,
  fetchForecast,
  fetchDailyForecast,
  fetchWeatherByCoords,
  fetchDailyByCoords,
} = require("../services/openWeatherService");

router.get("/current", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required." });

  try {
    const data = await fetchCurrentWeather(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch weather." });
  }
});
router.get("/current/coords", async (req, res) => {
  const { lat, lon } = req.query;
  const data = await fetchWeatherByCoords(lat, lon);
  res.json(data);
});

router.get("/daily/coords", async (req, res) => {
  const { lat, lon } = req.query;
  const data = await fetchDailyByCoords(lat, lon);
  res.json(data);
});

// 24h 3-HOURLY
router.get("/forecast", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required." });

  try {
    const data = await fetchForecast(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch forecast." });
  }
});

// 5-DAYS
router.get("/daily", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required." });

  try {
    const data = await fetchDailyForecast(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch daily forecast." });
  }
});

module.exports = router;
