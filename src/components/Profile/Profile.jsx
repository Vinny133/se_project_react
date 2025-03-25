import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useState, useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function Profile({
  handleCardClick,
  clothingItems,
  weatherData,
  handleAddClick,
  handleLogout,
  setUser,
  onCardLike,
}) {
  const { user } = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleLogout={handleLogout} setUser={setUser} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          onCardClick={handleCardClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
