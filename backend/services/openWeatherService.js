// backend/services/openWeatherService.js
const axios = require("axios");

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// CURRENT WEATHER
async function fetchCurrentWeather(city) {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, appid: API_KEY, units: "metric" },
  });
  const d = response.data;
  return {
    city: d.name,
    country: d.sys.country,
    temp: d.main.temp,
    feels_like: d.main.feels_like,
    humidity: d.main.humidity,
    pressure: d.main.pressure,
    condition: d.weather[0].main,
    description: d.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${d.weather[0].icon}@4x.png`,
    wind_speed: d.wind?.speed ?? null,
    wind_deg: d.wind?.deg ?? null,
    sunrise: d.sys?.sunrise ?? null,
    sunset: d.sys?.sunset ?? null,
    coord: d.coord,
  };
}
async function fetchWeatherByCoords(lat, lon) {
  const res = await axios.get(`${BASE_URL}/weather`, {
    params: { lat, lon, units: "metric", appid: API_KEY },
  });

  const d = res.data;

  return {
    city: d.name,
    country: d.sys.country,
    temp: d.main.temp,
    feels_like: d.main.feels_like,
    humidity: d.main.humidity,
    pressure: d.main.pressure,
    condition: d.weather[0].main,
    description: d.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${d.weather[0].icon}@4x.png`, // <-- FIX
    wind_speed: d.wind.speed,
    wind_deg: d.wind.deg,
    sunrise: d.sys.sunrise,
    sunset: d.sys.sunset,
    coord: d.coord,
  };
}

async function fetchDailyByCoords(lat, lon) {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: { lat, lon, units: "metric", appid: API_KEY },
  });

  const hourly = res.data.list;

  const days = {};
  hourly.forEach((h) => {
    const day = new Date(h.dt * 1000).toISOString().split("T")[0];
    if (!days[day]) days[day] = [];
    days[day].push(h);
  });
  const daily = Object.values(days)
    .slice(0, 7)
    .map((list) => {
      const temps = list.map((x) => x.main.temp);
      const w = list[0].weather[0];
      return {
        dt: list[0].dt,
        temp: {
          day: list[Math.floor(list.length / 2)].main.temp,
          min: Math.min(...temps),
          max: Math.max(...temps),
        },
        weather: w,
        icon: `https://openweathermap.org/img/wn/${w.icon}@2x.png`,
      };
    });
  return { hourly, daily };
}

// 5-day / 3-hourly forecast (FREE)
async function fetchForecast(city) {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, appid: API_KEY, units: "metric" },
  });
  return response.data.list;
}

async function fetchDailyForecast(city) {
  try {
    const hourly = await fetchForecast(city);
    // group entries by day
    const days = {};
    hourly.forEach((h) => {
      const day = new Date(h.dt * 1000).toISOString().split("T")[0];
      if (!days[day]) days[day] = [];
      days[day].push(h);
    });
    // compute daily summary
    const daily = Object.values(days)
      .slice(0, 7) // next 7 days
      .map((list) => {
        const temps = list.map((d) => d.main.temp);
        const weather = list[0].weather[0];
        return {
          dt: list[0].dt,
          temp: {
            day: list[Math.floor(list.length / 2)].main.temp,
            min: Math.min(...temps),
            max: Math.max(...temps),
          },
          weather,
          icon: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
        };
      });
    return { hourly, daily };
  } catch (err) {
    console.error("Derived daily forecast error:", err);
    throw err;
  }
}

module.exports = {
  fetchCurrentWeather,
  fetchForecast,
  fetchDailyForecast,
  fetchWeatherByCoords,
  fetchDailyByCoords,
};
