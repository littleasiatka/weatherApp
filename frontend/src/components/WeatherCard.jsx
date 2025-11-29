function degToCompass(num) {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}
function formatTime(ts) {
  if (!ts) return "--:--";
  return new Date(ts * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function WeatherCard({ weather }) {
  if (!weather) return null;
  const windDirection = degToCompass(weather.wind_deg ?? 0);
  const isDay =
    weather.sunrise &&
    weather.sunset && 
    Date.now() / 1000 > weather.sunrise &&
    Date.now() / 1000 < weather.sunset;
  return (
    <section className="weathercard-clean card">
      {/* LEFT — Main Icon */}
      <div className="wc-left">
        <img
          src={weather.icon}
          className="wc-main-icon"
          alt={weather.description}
        />
      </div>
      {/* CENTER — City + Temperature + Metrics */}
      <div className="wc-center">
        <h2 className="wc-city">
          {weather.city}, {weather.country}
        </h2>
        <div className="wc-temp-row">
          <div className="wc-temp">{Math.round(weather.temp)}°C</div>
          <div className="wc-feels">
            Feels like {Math.round(weather.feels_like)}°C
          </div>
        </div>
        <div className="wc-desc">{weather.description}</div>
        <div className="wc-metrics">
          {/* Humidity */}
          <div className="metric">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M12 2s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z"
                fill="currentColor"
              />
            </svg>
            <span>{weather.humidity}%</span>
          </div>
          {/* Pressure */}
          <div className="metric">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1="12"
                y1="12"
                x2="17"
                y2="9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>{weather.pressure} hPa</span>
          </div>
        </div>
      </div>
      {/* RIGHT — Wind + Sun Times */}
      <div className="wc-right">
        {/* WIND */}
        <div className="metric wind-metric">
          <div className="wind-icon-clear">
            {/* Beautiful compass arrow */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              style={{ transform: `rotate(${weather.wind_deg}deg)` }}
            >
              <path d="M12 2L15 9L12 7L9 9L12 2Z" fill="currentColor" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <line
                x1="12"
                y1="14"
                x2="12"
                y2="22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span>
            {weather.wind_speed} m/s ({windDirection})
          </span>
        </div>
        {/* SUNRISE + SUNSET */}
        <div className="sun-block">
          <div className="sun-item">
            {/* sunrise horizon icon */}
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path
                d="M3 15h18M12 3v5M6 15a6 6 0 1 1 12 0"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <span className="sun-label">Sunrise</span>
            <span>{formatTime(weather.sunrise)}</span>
          </div>
          <div className="sun-item">
            {/* sunset horizon icon */}
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path
                d="M3 15h18M12 21v-5M6 15a6 6 0 1 1 12 0"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <span className="sun-label">Sunset</span>
            <span>{formatTime(weather.sunset)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
