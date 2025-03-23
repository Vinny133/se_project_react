import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

function Header({ handleAddClick, weatherData, isLoggedIn }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { user: currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Header logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {isLoggedIn && currentUser ? (
        <>
          <button
            onClick={() => handleAddClick("add-garment")}
            type="button"
            className="header__add-button"
          >
            + Add clothes
          </button>

          <div className="header__user">
            <Link to="/profile" className="header__link">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>
          </div>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button
            onClick={() => handleAddClick("register")}
            className="header__auth-button"
          >
            Sign Up
          </button>
          <button
            onClick={() => handleAddClick("login")}
            className="header__auth-button"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
