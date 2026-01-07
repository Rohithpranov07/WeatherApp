import "../App.css";
import WeatherIcon from "./WeatherIcon";

export default function WeatherCard({ data, minTemp, maxTemp }) {
  return (
    <div className="weather-layout">
      <div className="main-weather-card glass">
        <WeatherIcon type={data.weather[0].main} />

        <p className="city-text">{data.name}</p>

        <h1 className="temperature-text">
          {Math.round(data.main.temp)}°
        </h1>

        <p className="condition-text">
          {data.weather[0].description}
        </p>
      </div>

      <div className="stats-section">
        <Stat
          label="Min / Max (Today)"
          value={`${Math.round(minTemp)}° / ${Math.round(maxTemp)}°`}
        />
        <Stat label="Humidity" value={`${data.main.humidity}%`} />
        <Stat label="Wind Speed" value={`${data.wind.speed} m/s`} />
        <Stat label="Pressure" value={`${Math.round(data.main.pressure)} hPa`} />
        <Stat label="Visibility" value={`${(data.visibility / 1000).toFixed(1)} km`} />
        <Stat
          label="Dew Point"
          value={`${Math.round(
            data.main.temp - (100 - data.main.humidity) / 5
          )}°`}
        />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat-card glass">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}