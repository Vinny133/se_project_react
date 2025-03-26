import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";
import {
  getItems,
  postItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { setToken, getToken, removeToken } from "../../utils/token";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedButton, setSelectedButton] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = (modalType) => {
    setActiveModal(modalType);
  };

  const handleButtonClick = (evt) => {
    setSelectedButton(evt.target.value);
  };

  const handleAddItemSubmit = (newItem) => {
    setClothingItems([newItem, ...clothingItems]);
  };

  const onAddItem = (newItem, resetForm) => {
    console.log(newItem);
    setIsLoading(true);

    postItems(newItem)
      .then((res) => {
        console.log(res);
        resetForm();

        handleAddItemSubmit(res);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = () => {
    console.log(selectedCard._id);

    deleteItems(selectedCard._id)
      .then(() => {
        const updatedItems = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(updatedItems);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  function getUserInfo() {
    const token = getToken();

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        navigate("/");
      })
      .catch(console.error);
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();

    const likeRequest = isLiked
      ? api.removeCardLike(id, token)
      : api.addCardLike(id, token);

    likeRequest
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) =>
            item._id === updatedCard.data._id ? updatedCard.data : item
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = async (formData) => {
    try {
      const res = await register(formData);
      if (res) {
        handleLogin(formData);
      }
    } catch (error) {
      console.error("Registration Failed: ", error);
    }
  };

  const handleLogin = async (formData) => {
    try {
      const res = await login(formData);
      if (res.token) {
        setToken(res.token);
        setActiveModal("");
        getUserInfo();

        console.log("User after login:", formData);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    console.log("closed");
    if (activeModal === "add-garment") {
      setSelectedButton("");
    }
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute user={user}>
                    <Profile
                      handleLogout={handleLogout}
                      setUser={setUser}
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            title="New garment"
            buttonText={isLoading ? "Saving..." : "Add garment"}
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            handleButtonClick={handleButtonClick}
            selectedButton={selectedButton}
            onAddItem={onAddItem}
          ></AddItemModal>
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDelete={handleDelete}
          />
          <RegisterModal
            title="Sign Up"
            buttonText={isLoading ? "Saving..." : "Sign Up"}
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
          />
          <LoginModal
            title="Log In"
            buttonText={isLoading ? "Saving..." : "Log in"}
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
