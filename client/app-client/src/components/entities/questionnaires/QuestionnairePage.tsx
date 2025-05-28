"use client"

import { useEffect, useState } from "react"
import { FileText, Plus, Search, Trash2, Edit, Eye, Loader, AlertCircle, ToggleLeft, ToggleRight } from "lucide-react"
import QuestionnaireForm from "../../popaps/questionnaire-form"
import QuestionnaireDetails from "../../popaps/questionnaire-details"
import { useDispatch, useSelector } from "react-redux"
import  { AppDispatch, RootState } from "../../store/Store"
import {
  fetchQuestionnaires,
  deleteQuestionnaire,
  updateQuestionnaire,
   Questionnaire,
   QuestionnaireCreateDto,
} from "../../store/QuestionnaireSlice"

const QuestionnaireManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const dispatch = useDispatch<AppDispatch>()
  const { questionnaires, loading, error } = useSelector((state: RootState) => state.questionnaires)

  useEffect(() => {
    dispatch(fetchQuestionnaires())
  }, [dispatch])

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [statusMessage])

  const handleAddQuestionnaire = () => {
    setSelectedQuestionnaire(null)
    setIsAddFormOpen(true)
  }

  const handleEditQuestionnaire = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire)
    setIsEditFormOpen(true)
  }

  const handleViewDetails = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire)
    setIsDetailsOpen(true)
  }

  const handleDeleteQuestionnaire = async (id: number) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק שאלון זה?")) {
      try {
        await dispatch(deleteQuestionnaire(id)).unwrap()
        setStatusMessage({ type: "success", text: "השאלון נמחק בהצלחה" })
      } catch (err: any) {
        setStatusMessage({ type: "error", text: err.message || "שגיאה במחיקת השאלון" })
      }
    }
  }

  const handleToggleActive = async (questionnaire: Questionnaire) => {
    try {
      const questionnaireData: QuestionnaireCreateDto = {
        name: questionnaire.name,
        sheetName: questionnaire.sheetName,
        prompt: questionnaire.prompt,
        googleSheetId: questionnaire.googleSheetId,
        googleFormUrl: questionnaire.googleFormUrl,
        isActive: !questionnaire.isActive,
      }

      await dispatch(
        updateQuestionnaire({
          id: questionnaire.id,
          questionnaireData,
        }),
      ).unwrap()

      // Refresh the data after update
      dispatch(fetchQuestionnaires())

      setStatusMessage({
        type: "success",
        text: `השאלון ${!questionnaire.isActive ? "הופעל" : "הושבת"} בהצלחה`,
      })
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "שגיאה בעדכון סטטוס השאלון" })
    }
  }

  const handleFormClose = (refreshData = false) => {
    setIsAddFormOpen(false)
    setIsEditFormOpen(false)
    if (refreshData) {
      dispatch(fetchQuestionnaires())
    }
  }

  const handleDetailsClose = () => {
    setIsDetailsOpen(false)
  }

  const filteredQuestionnaires = questionnaires.filter(
    (questionnaire:any) =>
      questionnaire.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      questionnaire.sheetName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="manager-home">
      <div className="manager-header">
        <FileText className="manager-icon" />
        <h1 className="manager-title">ניהול שאלונים</h1>
      </div>

      <div className="management-actions">
        <button className="add-client-button" onClick={handleAddQuestionnaire}>
          <Plus className="button-icon" />
          <span>הוסף שאלון</span>
        </button>

        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="חיפוש שאלונים..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {statusMessage && (
        <div className={`status-message ${statusMessage.type}`}>
          <span>{statusMessage.text}</span>
        </div>
      )}

      {loading ? (
        <div className="clients-loading">
          <Loader className="loading-icon" />
          <p>טוען שאלונים...</p>
        </div>
      ) : error ? (
        <div className="clients-error">
          <AlertCircle className="error-icon" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="questionnaires-table-container">
          <table className="questionnaires-table">
            <thead>
              <tr>
                <th>שם</th>
                <th>שם גיליון</th>
                <th>תאריך יצירה</th>
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestionnaires.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-table">
                    <FileText className="empty-icon" />
                    <p>לא נמצאו שאלונים</p>
                  </td>
                </tr>
              ) : (
                filteredQuestionnaires.map((questionnaire:any) => (
                  <tr key={questionnaire.id}>
                    <td>{questionnaire.name}</td>
                    <td>{questionnaire.sheetName}</td>
                    <td>{new Date(questionnaire.createdAt).toLocaleDateString("he-IL")}</td>
                    <td>
                      <div className="status-cell">
                        <button
                          className={`status-toggle ${questionnaire.isActive ? "active" : "inactive"}`}
                          onClick={() => handleToggleActive(questionnaire)}
                          aria-label={questionnaire.isActive ? "השבת שאלון" : "הפעל שאלון"}
                        >
                          {questionnaire.isActive ? (
                            <ToggleRight className="toggle-icon" />
                          ) : (
                            <ToggleLeft className="toggle-icon" />
                          )}
                          <span>{questionnaire.isActive ? "פעיל" : "לא פעיל"}</span>
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-button edit"
                          onClick={() => handleViewDetails(questionnaire)}
                          aria-label="צפה בפרטי שאלון"
                        >
                          <Eye className="action-icon" />
                        </button>
                        <button
                          className="action-button edit"
                          onClick={() => handleEditQuestionnaire(questionnaire)}
                          aria-label="ערוך שאלון"
                        >
                          <Edit className="action-icon" />
                        </button>
                        <button
                          className="action-button edit"
                          onClick={() => handleDeleteQuestionnaire(questionnaire.id)}
                          aria-label="מחק שאלון"
                        >
                          <Trash2 className="action-icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isAddFormOpen && <QuestionnaireForm questionnaire={null} onClose={handleFormClose} />}

      {isEditFormOpen && selectedQuestionnaire && (
        <QuestionnaireForm questionnaire={selectedQuestionnaire} onClose={handleFormClose} />
      )}

      {isDetailsOpen && selectedQuestionnaire && (
        <QuestionnaireDetails
          questionnaire={selectedQuestionnaire}
          onClose={handleDetailsClose}
          onEdit={() => {
            handleDetailsClose()
            handleEditQuestionnaire(selectedQuestionnaire)
          }}
        />
      )}
    </div>
  )
}

export default QuestionnaireManagement
