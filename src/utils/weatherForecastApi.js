const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchForecast(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  return res.json();
}