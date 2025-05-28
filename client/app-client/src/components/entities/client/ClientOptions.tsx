"use client"

import { useState } from "react"
import AddProject from "../../popaps/AddProject"
import ClientDetails from "../../popaps/ClientDetails"
import { FilePlus, Mail, UserCog } from "lucide-react"
import ManagerQuestionnaireFillForm from "../../popaps/manager-questionnaire-fill-form"
import SendEmailModal from "../../popaps/SendEmail"

const ClientOptions = ({ clientId }: { clientId: number }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] = useState(false)
  const [isMailModalOpen, setIsMailModalOpen] = useState(false)

  const handleAddProject = () => {
    setIsAddModalOpen(true)
  }

  const handleMailModalOpen = () => {
    setIsMailModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setIsDetailsModalOpen(false)
    setIsQuestionnaireModalOpen(false)
    setIsMailModalOpen(false)
  }

  const handleSuccess = () => {
    setIsAddModalOpen(false)
  }

  const handleViewDetails = () => {
    setIsDetailsModalOpen(true)
  }

  return (

    <div className="client-options-container">
      <div className="options-group">
        <button className="option-button add-project" onClick={handleAddProject}>
          <FilePlus className="option-icon" />
          <span>הוסף פרויקט</span>
        </button>

         <button className="option-button add-project" onClick={handleMailModalOpen}>
          <Mail className="option-icon" />
          <span>שלח מייל ללקוח</span>
        </button>

        <button className="option-button add-project" onClick={handleViewDetails}>
          <UserCog className="option-icon" />
          <span>פרטי לקוח</span>
        </button>

      </div>
      {isAddModalOpen && <AddProject client={{ id: clientId }} onClose={handleCloseModal} onSuccess={handleSuccess} />}
      {isDetailsModalOpen && <ClientDetails clientId={clientId} onClose={handleCloseModal} />}
      {isQuestionnaireModalOpen && <ManagerQuestionnaireFillForm clientId={clientId} onClose={handleCloseModal} />}
      {isMailModalOpen && <SendEmailModal  clientId={clientId} onClose={handleCloseModal}/>}
    </div>

  )
}

export default ClientOptions

