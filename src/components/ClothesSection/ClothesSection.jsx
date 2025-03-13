import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  weatherData,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button className="clothes-section__button" onClick={handleAddClick}>
          +Add new
        </button>
      </div>

      {userClothingItems.length > 0 ? (
        <ul className="cards__list">
          {userClothingItems.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
      ) : (
        <p className="clothes-section__empty">
          You haven’t added any items yet.
        </p>
      )}
    </div>
  );
}

export default ClothesSection;
