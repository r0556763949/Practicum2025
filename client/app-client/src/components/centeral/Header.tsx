import React, { useState } from "react";
import AuthForm from "../popaps/AuthForm";
import UserProfile from "./UserProfile";


const Header = () => {
  const [showPopupForm, setShowPopupForm] = useState(false);
  const token = sessionStorage.getItem("token");
  
  const handleFormClick = () => {
    setShowPopupForm(true); // להציג את הפופאפ
  };

  const closePopup = () => {
    setShowPopupForm(false); // לסגור את הפופאפ
  };

  return (
    <>
      <header className="header">{token ? (
          <UserProfile />
        ) : (
          <button className="login-button" onClick={handleFormClick}>
            כניסה למערכת
          </button>
        )}
      </header>
      {showPopupForm && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // מונע סגירה בלחיצה בתוך הטופס
          >
            <button className="close-button" onClick={closePopup}>
              סגור
            </button>
            <AuthForm onClose={closePopup}/>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;




const styles = `
/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to right, #003366, #66ccff);
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* Login Button */
.login-button {
  background-color: #ffffff;
  color: #003366;
  border: 2px solid #003366;
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  text-align: center;
  margin-right: 30px;
}

.login-button:hover {
  background-color: #003366;
  color: #ffffff;
  border-color: #ffffff;
}

/* Popup Overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* רקע אפור שקוף */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Popup Content */
.popup-content {
  position: relative;
  background-color: white;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Close Button */
.close-button {
  background-color: #ffffff;
  color: #003366;
  border: 2px solid #003366;
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  top: 10px;
  right: 10px;
}

.close-button:hover {
  background-color: #003366;
  color: #ffffff;
  border-color: #ffffff;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
