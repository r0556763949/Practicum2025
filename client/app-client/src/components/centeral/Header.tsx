"use client"

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AuthForm from "../popaps/AuthForm"
import UserProfile from "./UserProfile"
import UpdateClientDetailsPopup from "../popaps/UpdateClient"
import UpdatePasswordPopup from "../popaps/UpdatePasswordClient"
import decodeToken from "./authUtils"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/Store"
import { fetchProjectsByClientId } from "../store/ProjectSlice"
import { Building2, ChevronDown, Menu, User, Home, Settings } from "lucide-react"

const Header = () => {

  const [showPopupForm, setShowPopupForm] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showProjectsMenu, setShowProjectsMenu] = useState(false)
  const [popupType, setPopupType] = useState<"details" | "password" | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const token = sessionStorage.getItem("token")
  const decoded = token && decodeToken(token)
  const userRole = decoded && decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  const payload = token && decodeToken(token)
  const clientId = payload?.sub

  const dispatch = useDispatch<AppDispatch>()
  const { projects, loading, error } = useSelector((state: RootState) => state.projects)

  // Determine user type and current page context
  const isManager =
    userRole === "Manager" || location.pathname.includes("/Manager")
  const isClient = userRole === "Client" || location.pathname.includes("/Client")
  const isOnClientPage = location.pathname.includes("/ClientPage/")

  useEffect(() => {
    if (clientId && (isOnClientPage || isClient)) {
      dispatch(fetchProjectsByClientId(Number(clientId)))
    }
  }, [clientId, dispatch, isOnClientPage, isClient])

  const handleAccountClick = () => {
    if (token) {
      setShowMenu((prev) => !prev)
    } else {
      setShowPopupForm(true)
    }
  }

  const handleProjectsMenuClick = () => {
    setShowProjectsMenu((prev) => !prev)
  }

  const handleHomeClick = () => {
    if (isManager) {
      navigate("/Manager")
    } else if (isClient) {
      navigate("/Client")
    } else {
      navigate("/")
    }
    setMobileMenuOpen(false)
  }

  const closePopup = () => {
    setShowPopupForm(false)
    setPopupType(null)
    setShowMenu(false)
  }

  const openPopup = (type: "details" | "password") => {
    setPopupType(type)
    setShowMenu(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    navigate("/")
    setShowMenu(false)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="header">
        <div className="logo-container" onClick={() => navigate("/")}>
          <div className="logo-icon-wrapper">
            <Building2 className="logo-icon" />
          </div>
          <span className="logo-text">ESTI MUNK</span>
        </div>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <Menu />
        </button>

        <div className={`header-controls ${mobileMenuOpen ? "mobile-open" : ""}`}>
          {/* Home Button - Always visible when logged in */}
          {token && (
            <button className="home-button" onClick={handleHomeClick}>
              <Home className="button-icon" />
              <span>דף הבית</span>
            </button>
          )}

          {/* Projects Menu - Only for clients or when on client pages */}
          {token && (isClient || isOnClientPage) && (
            <div className="projects-dropdown">
              <button className="projects-button" onClick={handleProjectsMenuClick}>
                <span>פרויקטים</span>
                <ChevronDown className={`dropdown-icon ${showProjectsMenu ? "open" : ""}`} />
              </button>
              {showProjectsMenu && !loading && projects.length > 0 && (
                <div className="dropdown-menu projects-menu">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        localStorage.setItem("lastVisitedProject", project.id.toString())
                        if (isManager) {
                          navigate(`/ClientPage/${clientId}/ProjectPage/${project.id}`)
                        } else {
                          navigate(`/ClientPage/${clientId}/ProjectPage/${project.id}`)
                        }
                        setShowProjectsMenu(false)
                        setMobileMenuOpen(false)
                      }}
                      className="dropdown-item"
                    >
                      {project.description}
                    </div>
                  ))}
                </div>
              )}
              {showProjectsMenu && loading && <div className="dropdown-menu loading">טוען פרויקטים...</div>}
              {showProjectsMenu && error && <div className="dropdown-menu error">שגיאה בהבאת הפרויקטים</div>}
            </div>
          )}

          {/* Account Button */}
          <div className="account-dropdown">
            <button className="account-button" onClick={handleAccountClick}>
              {token ? (
                <>
                  <User className="button-icon" />
                  <span>חשבון</span>
                  <ChevronDown className={`dropdown-icon ${showMenu ? "open" : ""}`} />
                </>
              ) : (
                <>
                  <User className="button-icon" />
                  <span>התחברות</span>
                </>
              )}
            </button>

            {/* Account Menu */}
            {showMenu && token && (
              <div className="dropdown-menu account-menu">
                <div className="dropdown-item" onClick={() => openPopup("details")}>
                  <Settings className="item-icon" />
                  עדכון פרטים
                </div>
                <div className="dropdown-item" onClick={() => openPopup("password")}>
                  <Settings className="item-icon" />
                  שינוי סיסמה
                </div>
                <div className="dropdown-item logout" onClick={handleLogout}>
                  <User className="item-icon" />
                  התנתק
                </div>
              </div>
            )}
          </div>

          {token && <UserProfile />}
        </div>
      </header>

      {/* Auth Popup */}
      {showPopupForm && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>
              ×
            </button>
            <AuthForm onClose={closePopup} />
          </div>
        </div>
      )}

      {/* Update Popups */}
      {popupType && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>
              ×
            </button>
            {popupType === "details" ? (
              <UpdateClientDetailsPopup onClose={closePopup} />
            ) : (
              <UpdatePasswordPopup onClose={closePopup} />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Header

