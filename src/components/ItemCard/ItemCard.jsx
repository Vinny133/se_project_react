import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { user: currentUser } = useContext(CurrentUserContext);
  const isLiked = item.likes.some(
    (id) => String(id) === String(currentUser._id)
  );

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <button
        className={`card__like-button ${
          isLiked ? "card__like-button_active" : ""
        }`}
        onClick={handleLike}
      ></button>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
