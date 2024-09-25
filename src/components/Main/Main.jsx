import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../Contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothingItems }) {
  console.log(weatherData.weather?.temperature?.C);

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp =
    weatherData.weather?.temperature?.[currentTemperatureUnit] || 999;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {temp} &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
