import { useEffect, useState } from "react";
import useGeolocation from "./hooks/useGeolocation";
import { fetchWeather } from "./utils/weatherApi";
import { fetchForecast } from "./utils/weatherForecastApi";
import { weatherTheme } from "./utils/weatherTheme";
import {
  playWeatherSound,
  stopWeatherSound,
} from "./utils/weatherSound";

import WeatherCard from "./components/WeatherCard";
import RightPanel from "./components/RightPanel";
import VolumeOffIcon from "./assets/volume_off.svg";
import VolumeUpIcon from "./assets/volume_up.svg";
import "./App.css";

function App() {
  const { coords, error } = useGeolocation();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (!coords) return;

    fetchWeather(coords.lat, coords.lon).then(setWeather);
    fetchForecast(coords.lat, coords.lon).then(setForecast);
  }, [coords]);

  const toggleSound = () => {
    if (!weather) return;

    if (soundOn) stopWeatherSound();
    else playWeatherSound(weather.weather[0].main);

    setSoundOn(!soundOn);
  };

  if (error) return <div>Error: {error}</div>;
  if (!coords) return <div>Getting location...</div>;
  if (!weather || !forecast) return <div>Loading weather...</div>;


  const timezoneOffsetMs = weather.timezone * 1000;
  const nowLocal = Date.now() + timezoneOffsetMs;

  const startOfTodayLocal = new Date(nowLocal);
  startOfTodayLocal.setHours(0, 0, 0, 0);

  const tempsSoFar = forecast.list
    .map(item => {
      const itemTimeLocal = item.dt * 1000 + timezoneOffsetMs;
      return {
        temp: item.main.temp,
        time: itemTimeLocal,
      };
    })
    .filter(item =>
      item.time >= startOfTodayLocal.getTime() &&
      item.time <= nowLocal
    )
    .map(item => item.temp);

  tempsSoFar.push(weather.main.temp);

  const minTempSoFar = Math.min(...tempsSoFar);
  const maxTempSoFar = Math.max(...tempsSoFar);



  const theme = weatherTheme(weather.weather[0].main);
  const weatherType = weather.weather[0].main.toLowerCase();

  return (
    <div
      className={`app-root weather-${weatherType}`}
      style={{
        "--app-bg": theme.bg,
        color: theme.color,
      }}
    >
      {/* HEADER */}
      <header className="app-header glass">
        <h1 className="app-title">WeatherNow</h1>

        <button
          className="sound-toggle"
          onClick={toggleSound}
          aria-label="Toggle sound"
        >
          <img
            src={soundOn ? VolumeUpIcon : VolumeOffIcon}
            alt={soundOn ? "Sound On" : "Sound Off"}
            className="sound-icon"
          />
          <span>{soundOn ? "Sound On" : "Sound Off"}</span>
        </button>
      </header>

      {/* MAIN */}
      <main className="app-main">
        <WeatherCard
          data={weather}
          minTemp={minTempSoFar}
          maxTemp={maxTempSoFar}
        />
        <RightPanel forecast={forecast} />
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>Weather data by OpenWeatherMap.</p>
      </footer>
    </div>
  );
}

export default App;