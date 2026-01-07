import { useEffect, useState } from "react";
import "../App.css";

export default function RightPanel({ forecast }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDay = (date) =>
    date.toLocaleDateString("en-US", { weekday: "long" });

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const dailyForecast = forecast?.list
    ?.filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);

  return (
    <div className="right-panel">

      {/* DATE & TIME */}
      <div className="date-time">
        <p className="day-text">{formatDay(time)}</p>
        <p className="date-text">{formatDate(time)}</p>
        <p className="time-text">{time.toLocaleTimeString()}</p>
      </div>

      {/* FORECAST CARD */}
      <div className="forecast-card glass">
        <h3 className="forecast-title">5 Day Forecast</h3>

        <div className="forecast-list">
          {dailyForecast?.map((item) => (
            <div key={item.dt} className="forecast-item glass">
              <span>
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </span>

              <span>{Math.round(item.main.temp)}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}