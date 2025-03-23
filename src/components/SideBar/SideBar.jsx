import "./SideBar.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext, useState } from "react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUser } from "../../utils/api";

function SideBar({ handleLogout }) {
  const { user, setUser } = useContext(CurrentUserContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateUser = (updatedData) => {
    const token = localStorage.getItem("jwt");
    updateUser(token, updatedData)
      .then((updatedUser) => {
        setUser(updatedUser);
        setIsEditModalOpen(false);
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__user-data">
        <img className="sidebar__avatar" src={user?.avatar} alt="Avatar" />
        <p className="sidebar__username">{user?.name}</p>
      </div>

      <button className="sidebar__edit-button" onClick={handleEditClick}>
        Change profile data
      </button>

      <button className="sidebar__logout-button" onClick={handleLogout}>
        Log out
      </button>

      <EditProfileModal
        title="Change profile data"
        buttonText="Save changes"
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onUpdateUser={handleUpdateUser}
      ></EditProfileModal>
    </div>
  );
}

export default SideBar;
