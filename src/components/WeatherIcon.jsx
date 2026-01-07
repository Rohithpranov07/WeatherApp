import cloud from "../assets/Clouds.svg";
import rain from "../assets/rain.svg";
import clear from "../assets/clear.svg";
import thunder from "../assets/thunderstorm.png";

export default function WeatherIcon({ type }) {
  const map = {
    Clouds: cloud,
    Rain: rain,
    Clear: clear,
    Thunderstorm: thunder,
  };

  return (
    <img
      src={map[type] || cloud}
      className={`weather-icon icon-${type.toLowerCase()}`}
      alt={type}
    />
  );
}