import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, handleDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = currentUser && card.owner === currentUser._id;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>

          {isOwn && (
            <button className="modal__delete" onClick={handleDelete}>
              Delete item
            </button>
          )}

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
