import { useEffect, useState } from "react";
import AuthForm from "../popaps/AuthForm";
import UserProfile from "./UserProfile";
import UpdateClientDetailsPopup from "../popaps/UpdateClient";
import UpdatePasswordPopup from "../popaps/UpdatePasswordClient";
import decodeToken from "./authUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store";
import { fetchProjectsByClientId } from "../store/ProjectSlice";
import { Navigate, useNavigate } from "react-router-dom";


const Header = () => {
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);
  const [popupType, setPopupType] = useState<"details" | "password" | null>(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const payload = token && decodeToken(token);
  const clientId = payload?.sub;

  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, error } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchProjectsByClientId(Number(clientId))); // שליפה של פרויקטים עבור הלקוח
    }
  }, [clientId, dispatch]);

  const handleAccountClick = () => {
    if (token) {
      setShowMenu((prev) => !prev);
    } else {
      setShowPopupForm(true);
    }
  };

  const handleFormEnterClick = () => {
    setShowPopupForm(true);
  };

  const handleProjectsMenuClick = () => {
    setShowProjectsMenu((prev) => !prev);
  };

  const closePopup = () => {
    setPopupForm(false);
    setPopupType(null);
    setShowMenu(false);
  };

  const openPopup = (type: "details" | "password") => {
    setPopupType(type);
    setShowMenu(false);
  };

  const setPopupForm = (value: boolean) => {
    setShowPopupForm(value);
    setPopupType(null);
    setShowMenu(false);
  };

  return (
    <>
      <header className="header">
        <button className="login-button" onClick={handleAccountClick}>
          {token ? "ניהול חשבון" : "כניסה למערכת"}
        </button>
        {token && (
          <div>
            <button className="projects-button" onClick={handleProjectsMenuClick}>
              פרויקטים שלי
            </button>
            {showProjectsMenu && !loading && projects.length > 0 && (
              <div className="dropdown-menu">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      localStorage.setItem("lastVisitedProject", project.id.toString());
                      navigate(`ClientPage/${clientId}/ProjectPage/${project.id}`);
                      setShowProjectsMenu(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {project.description}
                  </div>
                ))}
              </div>
            )}
            {showProjectsMenu && loading && <div>טוען פרויקטים...</div>}
            {showProjectsMenu && error && <div>שגיאה בהבאת הפרויקטים: {error}</div>}
            <UserProfile />
          </div>
        )}
      </header>
      {showMenu && (
        <div className="dropdown-menu">
          <div onClick={() => { openPopup("details"); setShowMenu(false); }}>עדכון פרטים אישיים</div>
          <div onClick={() => { openPopup("password"); setShowMenu(false); }}>שינוי סיסמה</div>
        </div>
      )}
      {showPopupForm && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>סגור</button>
            <AuthForm onClose={closePopup} />

          </div>
        </div>
      )}
      {popupType && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>סגור</button>
            {popupType === "details" ? (
              <UpdateClientDetailsPopup onClose={closePopup} />
            ) : (
              <UpdatePasswordPopup onClose={closePopup} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;




const style = `
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
.dropdown-menu {
  position: absolute;
  top: 60px;
  right: 30px;
  background: white;
  border: 1px solid #003366;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 1002;
  overflow: hidden;
}

.dropdown-menu div {
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  color: #003366;
}

.dropdown-menu div:hover {
  background-color: #f0f8ff;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = style;
document.head.appendChild(styleSheet);


