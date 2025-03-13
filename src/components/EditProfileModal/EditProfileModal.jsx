import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({
  isOpen,
  onClose,
  handleButtonClick,
  buttonText,
  title,
  onUpdateUser,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <ModalWithForm
      title={title}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      handleButtonClick={handleButtonClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Email{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Name
        <input
          type="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Avatar"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
