"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  Building2,
  Calendar,
  ChevronRight,
  FileText,
  Folder,
  Info,
  Loader,
  LogOut,
  Settings,
  User,
  ExternalLink,
  Home,
  CheckSquare,
  Clock,
  Eye,
  Check,
} from "lucide-react"
import type { AppDispatch, RootState } from "../store/Store"
import decodeToken from "../centeral/authUtils"
import { fetchProjectsByClientId } from "../store/ProjectSlice"
import {
  type QuestionnaireFill,
  fetchQuestionnaireFillsByClientId,
  updateQuestionnaireFillSummary,
} from "../store/QuestionnaireFillSlice"
import { formatDate } from "../centeral/dateUtils"
import { fetchQuestionnaireById } from "../store/QuestionnaireSlice"
import UpdateClientDetailsPopup from "../popaps/UpdateClient"
import UpdatePasswordPopup from "../popaps/UpdatePasswordClient"
import QuestionnaireFillDetails from "../entities/questionnairesFill/questionnaire-fill-details"

const ClientDashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [clientId, setClientId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [showUpdateDetails, setShowUpdateDetails] = useState(false)
  const [showUpdatePassword, setShowUpdatePassword] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedQuestionnaireFill, setSelectedQuestionnaireFill] = useState<QuestionnaireFill | null>(null)

  // Redux selectors
  const { projects, loading: projectsLoading } = useSelector((state: RootState) => state.projects)
  const { questionnaireFills, loading: questionnairesLoading } = useSelector(
    (state: RootState) => state.questionnairesFill || { questionnaireFills: [], loading: false },
  )
  const { files, loading: filesLoading } = useSelector(
    (state: RootState) => state.files || { files: [], loading: false },
  )

  useEffect(() => {
    // Get client ID from token
    const token = sessionStorage.getItem("token")
    if (token) {
      const decoded = decodeToken(token)
      if (decoded && decoded.sub) {
        const id = Number(decoded.sub)
        setClientId(id)
        console.log("dashboard of client: ", id)

        // Fetch all client data
        dispatch(fetchProjectsByClientId(id))
        dispatch(fetchQuestionnaireFillsByClientId(id))
        // dispatch(fetchFiles(id))
      }
    }
  }, [dispatch])

  useEffect(() => {
    // Check if all data is loaded
    if (!projectsLoading && !questionnairesLoading && !filesLoading) {
      setLoading(false)
    }
  }, [projectsLoading, questionnairesLoading, filesLoading])

  // Filter questionnaire fills for the current client
  const clientQuestionnaireUnFills = questionnaireFills.filter((fill: QuestionnaireFill) => !fill.filledAt)
  const clientQuestionnaireFilled = questionnaireFills.filter((fill: QuestionnaireFill) => fill.filledAt)

  const handleOpenForm = async (fill: QuestionnaireFill) => {
    try {
      const action = await dispatch(fetchQuestionnaireById(fill.questionnaireId))

      if (fetchQuestionnaireById.fulfilled.match(action)) {
        const questionnaire = action.payload
        if (questionnaire.googleFormUrl) {
          window.open(questionnaire.googleFormUrl, "_blank")
        } else {
          console.warn("No Google Form URL found.")
        }
      } else {
        console.error("Failed to fetch questionnaire.")
      }
    } catch (error) {
      console.error("Error fetching questionnaire:", error)
    }
  }

  const handleConfirmForm = (fill: QuestionnaireFill) => {
    if (fill.clientId) {
      dispatch(updateQuestionnaireFillSummary({ id: fill.id, clientId: Number(fill.clientId) }))
    }
  }

  const handleNavigateToProject = (projectId: number) => {
    if (clientId) {
      localStorage.setItem("lastVisitedProject", projectId.toString())
      navigate(`/ClientPage/${clientId}/ProjectPage/${projectId}`)
    }
  }

  // Check if there's a last visited project
  const lastVisitedProjectId = localStorage.getItem("lastVisitedProject")
  const lastVisitedProject = lastVisitedProjectId ? projects.find((p) => p.id === Number(lastVisitedProjectId)) : null

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Loader className="loading-icon" />
        <p>טוען נתונים...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">אסתי מונק אדריכלות</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Home className="nav-icon" />
            <span>דף הבית</span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            <Building2 className="nav-icon" />
            <span>הפרויקטים שלי</span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "questionnaires" ? "active" : ""}`}
            onClick={() => setActiveTab("questionnaires")}
          >
            <FileText className="nav-icon" />
            <span>שאלונים</span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <User className="nav-icon" />
            <span>ניהול חשבון</span>
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={() => navigate("/logout")}>
            <LogOut className="nav-icon" />
            <span>התנתק</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header with mobile navigation */}
        <header className="dashboard-mobile-header">
          <h2 className="mobile-title">אסתי מונק אדריכלות</h2>
          <div className="mobile-nav">
            <button
              className={`mobile-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <Home className="nav-icon-small" />
            </button>
            <button
              className={`mobile-nav-item ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              <Building2 className="nav-icon-small" />
            </button>
            <button
              className={`mobile-nav-item ${activeTab === "questionnaires" ? "active" : ""}`}
              onClick={() => setActiveTab("questionnaires")}
            >
              <FileText className="nav-icon-small" />
            </button>
            <button
              className={`mobile-nav-item ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              <User className="nav-icon-small" />
            </button>
          </div>
        </header>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="dashboard-content">

            {/* Welcome Section */}
            <div className="dashboard-section welcome-section">
              <div className="section-header">
                <Info className="section-icon" />
                <h3 className="section-title">ברוכים הבאים</h3>
              </div>
              <p className="section-description">
                ברוכים הבאים למערכת הניהול של אסתי מונק אדריכלות. כאן תוכלו לנהל את הפרויקטים שלכם, לצפות בקבצים, למלא
                שאלונים ולתקשר עם צוות האדריכלים.
              </p>
            </div>

            {/* Last Visited Project */}
            {lastVisitedProject && (
              <div className="dashboard-section">
                <div className="section-header">
                  <Folder className="section-icon" />
                  <h3 className="section-title">הפרויקט האחרון שלך</h3>
                </div>
                <div className="last-project-card" onClick={() => handleNavigateToProject(lastVisitedProject.id)}>
                  <div className="project-icon">
                    <Building2 />
                  </div>
                  <div className="project-details">
                    <h4 className="project-name">{lastVisitedProject.description}</h4>
                    {lastVisitedProject.address && (
                      <div className="project-meta">
                        <span className="meta-text">{lastVisitedProject.address}</span>
                      </div>
                    )}
                    {lastVisitedProject.startAt && (
                      <div className="project-meta">
                        <Calendar className="meta-icon" size={16} />
                        <span className="meta-text">{new Date(lastVisitedProject.startAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="project-arrow" />
                </div>
              </div>
            )}

            {/* Pending Questionnaires */}
            {clientQuestionnaireUnFills.length > 0 && (
              <div className="dashboard-section">
                <div className="section-header">
                  <FileText className="section-icon" />
                  <h3 className="section-title">שאלונים למילוי</h3>
                </div>
                <div className="questionnaires-grid">
                  {clientQuestionnaireUnFills.slice(0, 3).map((fill: QuestionnaireFill) => (
                    <div key={fill.id} className="questionnaire-card">
                      <div className="questionnaire-header">
                        <FileText className="questionnaire-icon" />
                        <h4 className="questionnaire-title">{fill.questionnaireName}</h4>
                      </div>
                      <div className="questionnaire-info">
                        <div className="info-item">
                          <span className="info-label">תאריך בקשה:</span>
                          <span className="info-value">{formatDate(fill.getToFillAt)}</span>
                        </div>
                      </div>
                      <div className="questionnaire-actions">
                        <button className="questionnaire-button fill" onClick={() => handleOpenForm(fill)}>
                          <span>מלא שאלון</span>
                          <ExternalLink className="button-icon" size={16} />
                        </button>
                        <button className="questionnaire-button confirm" onClick={() => handleConfirmForm(fill)}>
                          <span>אישור</span>
                          <Check className="button-icon" size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {clientQuestionnaireUnFills.length > 3 && (
                  <button className="view-all-button" onClick={() => setActiveTab("questionnaires")}>
                    צפה בכל השאלונים ({clientQuestionnaireUnFills.length})
                  </button>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3 className="section-title">פעולות מהירות</h3>
              </div>
              <div className="quick-actions-grid">
                <button className="quick-action-card" onClick={() => setActiveTab("account")}>
                  <div className="card-icon">
                    <User />
                  </div>
                  <div className="card-content">
                    <h4 className="card-title">פרופיל</h4>
                    <p className="card-description">צפייה ועדכון פרטי הפרופיל שלך</p>
                  </div>
                </button>

                <button className="quick-action-card" onClick={() => setActiveTab("projects")}>
                  <div className="card-icon">
                    <Building2 />
                  </div>
                  <div className="card-content">
                    <h4 className="card-title">פרויקטים</h4>
                    <p className="card-description">ניהול הפרויקטים שלך</p>
                  </div>
                </button>

                <button className="quick-action-card" onClick={() => navigate("/files")}>
                  <div className="card-icon">
                    <FileText />
                  </div>
                  <div className="card-content">
                    <h4 className="card-title">קבצים</h4>
                    <p className="card-description">צפייה בקבצים ותוכניות</p>
                  </div>
                </button>

                <button className="quick-action-card" onClick={() => navigate("/timeline")}>
                  <div className="card-icon">
                    <Calendar />
                  </div>
                  <div className="card-content">
                    <h4 className="card-title">לוח זמנים</h4>
                    <p className="card-description">מעקב אחר התקדמות הפרויקט</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="dashboard-content">
            <h1 className="dashboard-title">הפרויקטים שלי</h1>
            <div className="dashboard-section">
              <div className="section-header">
                <Building2 className="section-icon" />
                <h3 className="section-title">כל הפרויקטים</h3>
              </div>
              {projects.length > 0 ? (
                <div className="projects-grid">
                  {projects.map((project) => (
                    <div key={project.id} className="project-card" onClick={() => handleNavigateToProject(project.id)}>
                      <div className="project-card-header">
                        <Building2 className="project-card-icon" />
                        <h4 className="project-card-title">{project.description}</h4>
                      </div>
                      {project.address && (
                        <div className="project-card-meta">
                          <span className="meta-text">{project.address}</span>
                        </div>
                      )}
                      {project.startAt && (
                        <div className="project-card-meta">
                          <Calendar className="meta-icon" size={16} />
                          <span className="meta-text">{new Date(project.startAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      <button className="project-card-button">
                        <span>צפה בפרויקט</span>
                        <ChevronRight className="button-icon" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>אין פרויקטים זמינים כרגע.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Questionnaires Tab */}
        {activeTab === "questionnaires" && (
          <div className="dashboard-content">
            <h1 className="dashboard-title">שאלונים</h1>

            {/* Pending Questionnaires */}
            {clientQuestionnaireUnFills.length > 0 && (
              <div className="dashboard-section">
                <div className="section-header">
                  <Clock className="section-icon" />
                  <h3 className="section-title">שאלונים למילוי</h3>
                </div>
                <div className="questionnaires-grid">
                  {clientQuestionnaireUnFills.map((fill: QuestionnaireFill) => (
                    <div key={fill.id} className="questionnaire-card">
                      <div className="questionnaire-header">
                        <FileText className="questionnaire-icon" />
                        <h4 className="questionnaire-title">{fill.questionnaireName}</h4>
                      </div>
                      <div className="questionnaire-info">
                        <div className="info-item">
                          <span className="info-label">תאריך בקשה:</span>
                          <span className="info-value">{formatDate(fill.getToFillAt)}</span>
                        </div>
                      </div>
                      <div className="questionnaire-actions">
                        <button className="questionnaire-button fill" onClick={() => handleOpenForm(fill)}>
                          <span>מלא שאלון</span>
                          <ExternalLink className="button-icon" size={16} />
                        </button>
                        <button className="questionnaire-button confirm" onClick={() => handleConfirmForm(fill)}>
                          <span>סיום מילוי שאלון</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Questionnaires */}
            {clientQuestionnaireFilled.length > 0 && (
              <div className="dashboard-section">
                <div className="section-header">
                  <CheckSquare className="section-icon" />
                  <h3 className="section-title">שאלונים שמולאו</h3>
                </div>
                <div className="questionnaires-grid">
                  {clientQuestionnaireFilled.map((fill: QuestionnaireFill) => (
                    <div key={fill.id} className="questionnaire-card completed">
                      <div className="questionnaire-header">
                        <CheckSquare className="questionnaire-icon" />
                        <h4 className="questionnaire-title">{fill.questionnaireName}</h4>
                      </div>
                      <div className="questionnaire-info">
                        <div className="info-item">
                          <span className="info-label">תאריך מילוי:</span>
                          <span className="info-value">{formatDate(fill.filledAt || "")}</span>
                        </div>
                      </div>
                      <div className="questionnaire-actions">
                        <button
                          className="questionnaire-button view"
                          onClick={() => setSelectedQuestionnaireFill(fill)}
                        >
                          <span>צפה בתשובות</span>
                          <Eye className="button-icon" size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {clientQuestionnaireUnFills.length === 0 && clientQuestionnaireFilled.length === 0 && (
              <div className="empty-state">
                <p>אין שאלונים זמינים כרגע.</p>
              </div>
            )}
          </div>
        )}

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="dashboard-content">
            <h1 className="dashboard-title">ניהול חשבון</h1>
            <div className="dashboard-section">
              <div className="section-header">
                <Settings className="section-icon" />
                <h3 className="section-title">הגדרות חשבון</h3>
              </div>
              <div className="account-options">
                <button className="account-option" onClick={() => setShowUpdateDetails(true)}>
                  <User className="option-icon" />
                  <div className="option-content">
                    <h4 className="option-title">עדכון פרטים אישיים</h4>
                    <p className="option-description">עדכון שם, כתובת, טלפון ופרטי קשר</p>
                  </div>
                  <ChevronRight className="option-arrow" />
                </button>
                <button className="account-option" onClick={() => setShowUpdatePassword(true)}>
                  <Settings className="option-icon" />
                  <div className="option-content">
                    <h4 className="option-title">שינוי סיסמה</h4>
                    <p className="option-description">עדכון סיסמת הכניסה לחשבון</p>
                  </div>
                  <ChevronRight className="option-arrow" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Popups */}
      {showUpdateDetails && <UpdateClientDetailsPopup onClose={() => setShowUpdateDetails(false)} />}
      {showUpdatePassword && <UpdatePasswordPopup onClose={() => setShowUpdatePassword(false)} />}
      {selectedQuestionnaireFill && (
        <QuestionnaireFillDetails
          questionnaireFill={selectedQuestionnaireFill}
          onClose={() => setSelectedQuestionnaireFill(null)}
        />
      )}
    </div>
  )
}

export default ClientDashboard
