import { weatherOptions } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredOptions[0]?.url;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img src={weatherOptionUrl} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
