import "./LoginModal.css";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  onClose,
  handleButtonClick,
  isOpen,
  buttonText,
  title,
  onLogin,
  onSwitch,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
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
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button className="modal__sign-in" onClick={onSwitch}>
        or Sign up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
