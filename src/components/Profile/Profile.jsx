import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sibebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection onCardClick={handleCardClick} />
      </section>
    </div>
  );
}

export default Profile;
