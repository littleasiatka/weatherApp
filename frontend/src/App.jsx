import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import Forecast from "./components/Forecast";
import History from "./components/History";
import Welcome from "./components/Welcome";
import "./styles.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [dark, setDark] = useState(false);

  // sync <body> theme
  useEffect(() => {
    if (dark) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [dark]);

  // load search history
  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("History load error:", err));
  }, []);
  async function fetchWeatherByCoords(lat, lon) {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const resp = await fetch(
        `/api/weather/current/coords?lat=${lat}&lon=${lon}`
      );
      const data = await resp.json();
      setWeather(data);

      // save to history
      if (data.city) {
        await fetch("/api/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: data.city }),
        });

        // refresh history list
        const updatedHistory = await fetch("/api/history").then((r) =>
          r.json()
        );
        setHistory(updatedHistory);
      }

      const dailyResp = await fetch(
        `/api/weather/daily/coords?lat=${lat}&lon=${lon}`
      ).then((r) => r.json());

      setHourly(dailyResp.hourly);
      setDaily(dailyResp.daily);
    } catch (err) {
      setError("Could not fetch weather for your location.");
    } finally {
      setLoading(false);
    }
  }

  // Location
  function useMyLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation not supported on this device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        setError("Permission denied or unavailable.");
      }
    );
  }

  async function fetchWeather(city) {
    const formattedCity =
      city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    setLoading(true);
    setError("");
    setWeather(null);
    setHourly(null);
    setDaily(null);
    try {
      // current
      const currentResp = await fetch(`/api/weather/current?city=${city}`);
      if (!currentResp.ok) throw new Error(`No results found for "${city}"`);
      const currentData = await currentResp.json();
      setWeather(currentData);
      // save history
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: formattedCity }),
      });
      const updatedHistory = await fetch("/api/history").then((r) => r.json());
      setHistory(updatedHistory);
      // Get daily + hourly from ONE CALL API
      const dailyResp = await fetch(`/api/weather/daily?city=${city}`).then(
        (r) => r.json()
      );
      setHourly(dailyResp.hourly);
      setDaily(dailyResp.daily);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function deleteHistoryItem(city) {
    try {
      const resp = await fetch(`/api/history/${city}`, {
        method: "DELETE",
      });
      const data = await resp.json();
      setHistory(data.history);
    } catch {
      console.error("Failed to delete city");
    }
  }
  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <div className="theme-toggle-container">
        <button className="dark-toggle" onClick={() => setDark(!dark)}>
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <h1 className="title">WeatherNow</h1>
      <SearchBar
        onSearch={fetchWeather}
        onUseLocation={useMyLocation}
        disabled={loading}
      />
      {/* hide history if empty */}
      {history.length > 0 && (
        <History
          items={history}
          onClick={fetchWeather}
          onDelete={deleteHistoryItem}
        />
      )}
      {loading ? (
        <div className="loading-container">
          <div className="spinner" />
        </div>
      ) : (
        <>
          {/* Welcome screen */}
          {error && <p className="error">{error}</p>}
          {!weather && !loading && !error ? (
            <Welcome />
          ) : (
            <>
              {weather && <WeatherCard weather={weather} />}
              <Forecast hourly={hourly} daily={daily} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
