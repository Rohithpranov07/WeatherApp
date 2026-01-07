import rain from "../assets/sounds/rain.mp3";
import thunder from "../assets/sounds/thunder.mp3";
import wind from "../assets/sounds/wind.mp3";
import clear from "../assets/sounds/clear.mp3";

let audio = null;

export function playWeatherSound(type) {
  stopWeatherSound();

  let sound;
  switch (type) {
    case "Rain":
      sound = rain;
      break;
    case "Thunderstorm":
      sound = thunder;
      break;
    case "Clouds":
      sound = wind;
      break;
    case "Clear":
      sound = clear;
      break;
    default:
      return;
  }

  audio = new Audio(sound);
  audio.loop = true;
  audio.volume = 0.5;
  audio.play();
}

export function stopWeatherSound() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    audio = null;
  }
}
