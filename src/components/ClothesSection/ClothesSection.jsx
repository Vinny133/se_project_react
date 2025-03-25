import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  weatherData,
  handleAddClick,
  onCardLike,
}) {
  const { user: currentUser } = useContext(CurrentUserContext);

  if (!currentUser) {
    return null;
  }

  const userClothingItems = clothingItems.filter(
    (item) => item.owner?.toString() === currentUser?._id?.toString()
  );

  console.log("Current User ID:", currentUser?._id);
  console.log("Clothing Items:", clothingItems);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button
          className="clothes-section__button"
          onClick={() => handleAddClick("add-garment")}
        >
          +Add new
        </button>
      </div>

      {userClothingItems.length > 0 ? (
        <ul className="cards__list">
          {userClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
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
