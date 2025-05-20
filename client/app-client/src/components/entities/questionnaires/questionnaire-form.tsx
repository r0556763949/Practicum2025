"use client"

import type React from "react"

import { useState } from "react"
import { X, AlertCircle, CheckCircle, HelpCircle, Plus } from "lucide-react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/Store"
import { addQuestionnaire, updateQuestionnaire, type QuestionnaireCreateDto } from "../../store/QuestionnaireSlice"

interface QuestionnaireFormProps {
  questionnaire: {
    id: number
    name: string
    sheetName: string
    prompt: string
    googleSheetId: string
    googleFormUrl: string
    isActive: boolean
  } | null
  onClose: (refreshData?: boolean) => void
}

const QuestionnaireForm = ({ questionnaire, onClose }: QuestionnaireFormProps) => {
  const [formData, setFormData] = useState({
    id: questionnaire?.id || 0,
    name: questionnaire?.name || "",
    sheetName: questionnaire?.sheetName || "",
    prompt: questionnaire?.prompt || "",
    googleSheetId: questionnaire?.googleSheetId || "",
    googleFormUrl: questionnaire?.googleFormUrl || "",
    isActive: questionnaire?.isActive ?? true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const isEditMode = !!questionnaire
  const dispatch = useDispatch<AppDispatch>()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "שם השאלון הוא שדה חובה"
    }

    if (!formData.sheetName.trim()) {
      newErrors.sheetName = "שם הגיליון הוא שדה חובה"
    }

    if (!formData.googleFormUrl.trim()) {
      newErrors.googleFormUrl = "כתובת הטופס היא שדה חובה"
    } else if (!isValidUrl(formData.googleFormUrl)) {
      newErrors.googleFormUrl = "כתובת הטופס אינה תקינה"
    }

    if (!formData.googleSheetId.trim()) {
      newErrors.googleSheetId = "מזהה הגיליון הוא שדה חובה"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const questionnaireData: QuestionnaireCreateDto = {
        name: formData.name,
        sheetName: formData.sheetName,
        prompt: formData.prompt,
        googleSheetId: formData.googleSheetId,
        googleFormUrl: formData.googleFormUrl,
        isActive: formData.isActive,
      }

      if (isEditMode) {
        await dispatch(
          updateQuestionnaire({
            id: formData.id,
            questionnaireData,
          }),
        ).unwrap()
      } else {
        await dispatch(addQuestionnaire(questionnaireData)).unwrap()
      }

      setStatusMessage({
        type: "success",
        text: `השאלון ${isEditMode ? "עודכן" : "נוצר"} בהצלחה`,
      })

      // Close the form after a short delay to show the success message
      setTimeout(() => {
        onClose(true) // Pass true to refresh data
      }, 1500)
    } catch (error: any) {
      setStatusMessage({
        type: "error",
        text: error.message || `שגיאה ב${isEditMode ? "עדכון" : "יצירת"} השאלון`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
        <Plus className="modal-title-icon" />
          <h2 className="modal-title">{isEditMode ? "עריכת שאלון" : "הוספת שאלון חדש"}</h2>
          <button onClick={() => onClose()} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {statusMessage && (
            <div className={`form-status ${statusMessage.type}`}>
              {statusMessage.type === "success" ? (
                <CheckCircle className="status-icon" />
              ) : (
                <AlertCircle className="status-icon" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="questionnaire-form">
            <div className="form-group">
              <label>שם השאלון *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "form-input error" : "form-input"}
                placeholder="הזן שם לשאלון"
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label>שם גיליון *</label>
              <input
                type="text"
                id="sheetName"
                name="sheetName"
                value={formData.sheetName}
                onChange={handleChange}
                className={errors.sheetName ? "form-input error" : "form-input"}
                placeholder="הזן שם לגיליון"
              />
              {errors.sheetName && <div className="error-message">{errors.sheetName}</div>}
            </div>

            <div className="form-group">
              <label>טקסט GPT</label>
              <textarea
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                className="form-input"
                placeholder="הזן הנחיות למילוי השאלון"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>
                מזהה גיליון Google *
                <HelpCircle className="help-icon" />
              </label>
              <input
                type="text"
                id="googleSheetId"
                name="googleSheetId"
                value={formData.googleSheetId}
                onChange={handleChange}
                className={errors.googleSheetId ? "form-input error" : "form-input"}
                placeholder="הזן מזהה גיליון Google"
              />
              {errors.googleSheetId && <div className="error-message">{errors.googleSheetId}</div>}
            </div>

            <div className="form-group">
              <label>כתובת טופס Google *</label>
              <input
                type="text"
                id="googleFormUrl"
                name="googleFormUrl"
                value={formData.googleFormUrl}
                onChange={handleChange}
                className={errors.googleFormUrl ? "form-input error" : "form-input"}
                placeholder="הזן כתובת טופס Google"
              />
              {errors.googleFormUrl && <div className="error-message">{errors.googleFormUrl}</div>}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className="form-checkbox"
                />
                <span>שאלון פעיל</span>
              </label>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button onClick={() => onClose()} className="modal-button secondary" disabled={isSubmitting}>
            ביטול
          </button>
          <button
            onClick={handleSubmit}
            className={`modal-button primary ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                <span>{isEditMode ? "מעדכן..." : "שומר..."}</span>
              </>
            ) : (
              <span>{isEditMode ? "עדכן שאלון" : "צור שאלון"}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireForm
