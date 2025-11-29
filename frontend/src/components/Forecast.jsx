export default function Forecast({ hourly, daily }) {
  const fmt = (ts, type = "hour") => {
    const d = new Date(ts * 1000);
    return type === "hour"
      ? d.toLocaleTimeString([], { hour: "2-digit" })
      : d.toLocaleDateString([], { weekday: "short" });
  };

  return (
    <div className="forecast">
      {/* FULL 3-HOURLY FORECAST (24 hours) */}
      {hourly && (
        <>
          <h3>3-Hourly Forecast</h3>
          <div className="forecast-list">
            {hourly.slice(0, 8).map((h, i) => (
              <div className="forecast-card" key={i}>
                <p>{fmt(h.dt, "hour")}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png`}
                  alt=""
                />
                <p>{Math.round(h.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </>
      )}
      {/* WEEKLY FORECAST */}
      {daily && (
        <>
          <h3>Next 5 Days</h3>
          <div className="forecast-list">
            {daily.slice(0, 7).map((d, i) => (
              <div className="forecast-card daily-card" key={i}>
                <p>{fmt(d.dt, "day")}</p>
                <img src={d.icon} alt="" />
                <p>{Math.round(d.temp.day)}°C</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
