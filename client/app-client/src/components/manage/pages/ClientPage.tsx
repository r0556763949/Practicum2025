
import { useParams } from "react-router-dom";
import ProjectList from "../client/ProjectList";
import ClientContent from "../client/ClientContent";
import ClientOptions from "../client/ClientOptions";

const ClientPage = () => {
    const { clientId } = useParams();

    return (
        <div className="client-page-container">
          {/* קלאס ל-ProjetList */}
          <div className="client-page-project-list">
            <ProjectList clientId={parseInt(clientId!)} />
          </div>
    
          {/* קלאס ל-ClientContent */}
          <div className="client-page-content">
            <ClientContent />
          </div>
    
          {/* קלאס ל-ClientOptions */}
          <div className="client-page-options">
            <ClientOptions clientId={parseInt(clientId!)} />
          </div>
        </div>
      );
    };


export default ClientPage;