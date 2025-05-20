"use client"

import { useState } from "react"
import AddProject from "../../popaps/AddProject"
import ClientDetails from "../../popaps/ClientDetails"
import { FilePlus, FileText, UserCog } from "lucide-react"
import ManagerQuestionnaireFillForm from "../questionnairesFill/manager-questionnaire-fill-form"
import ManagerQuestionnaireFillList from "../questionnairesFill/manager-questionnaire-fill-list"

const ClientOptions = ({ clientId }: { clientId: number }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] = useState(false)

  const handleAddProject = () => {
    setIsAddModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setIsDetailsModalOpen(false)
    setIsQuestionnaireModalOpen(false)
  }

  const handleSuccess = () => {
    setIsAddModalOpen(false)
  }

  const handleViewDetails = () => {
    setIsDetailsModalOpen(true)
  }

  const handleAddQuestionnaire = () => {
    setIsQuestionnaireModalOpen(true)
  }

  return (

    <div className="client-options-container">
      <ManagerQuestionnaireFillList clientId={clientId}></ManagerQuestionnaireFillList>
      <div className="options-group">
        <button className="option-button add-project" onClick={handleAddProject}>
          <FilePlus className="option-icon" />
          <span>הוסף פרויקט</span>
        </button>

        {/* <button className="option-button add-questionnaire" onClick={handleAddQuestionnaire}>
          <FileText className="option-icon" />
          <span>שלח שאלון</span>
        </button> */}

        <button className="option-button view-details" onClick={handleViewDetails}>
          <UserCog className="option-icon" />
          <span>פרטי לקוח</span>
        </button>
      </div>

      {isAddModalOpen && <AddProject client={{ id: clientId }} onClose={handleCloseModal} onSuccess={handleSuccess} />}

      {isDetailsModalOpen && <ClientDetails clientId={clientId} onClose={handleCloseModal} />}

      {isQuestionnaireModalOpen && <ManagerQuestionnaireFillForm clientId={clientId} onClose={handleCloseModal} />}
    </div>
  )
}

export default ClientOptions
