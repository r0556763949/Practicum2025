
// import { useParams } from "react-router-dom";
// import ProjectList from "../client/ProjectList";
// import ClientContent from "../client/ClientContent";
// import ClientOptions from "../client/ClientOptions";

// const ClientPage = () => {
//     const { clientId } = useParams();

//     return (
//         <div className="client-page-container">
//           {/* קלאס ל-ProjetList */}
//           <div className="client-page-project-list">
//             <ProjectList clientId={parseInt(clientId!)} />
//           </div>
    
//           {/* קלאס ל-ClientContent */}
//           <div className="client-page-content">
//             <ClientContent />
//           </div>
    
//           {/* קלאס ל-ClientOptions */}
//           <div className="client-page-options">
//             <ClientOptions clientId={parseInt(clientId!)} />
//           </div>
//         </div>
//       );
//     };


// export default ClientPage;


"use client"

import { useParams } from "react-router-dom"
import ProjectList from "../entities/client/ProjectList"
import ClientContent from "../entities/client/ClientContent"
import ClientOptions from "../entities/client/ClientOptions"
import { Folder, Settings } from "lucide-react"

const ClientPage = () => {
  const { clientId } = useParams()

  return (
    <div className="client-page">
      <div className="client-sidebar">
        <div className="sidebar-section">
          <div className="sidebar-header">
            <Folder className="sidebar-icon" />
            <h3 className="sidebar-title">הפרויקטים שלי</h3>
          </div>
          <ProjectList clientId={Number.parseInt(clientId!)} />
        </div>
      </div>

      <div className="client-content">
        <ClientContent />
      </div>

      <div className="client-options">
        <div className="options-header">
          <Settings className="options-icon" />
          <h3 className="options-title">אפשרויות</h3>
        </div>
        <ClientOptions clientId={Number.parseInt(clientId!)} />
      </div>
    </div>
  )
}

export default ClientPage
