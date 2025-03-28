
import { useParams } from "react-router-dom";
import ProjectList from "../Client/ProjectList";
import ClientContent from "../Client/ClientContent";
import ClientOptions from "../Client/ClientOptions";

const ClientPage = () => {
    const { clientId } = useParams();

    return (
        <div className="ClientPage-container">
            <ProjectList clientId={clientId} />
            <ClientContent />
            <ClientOptions clientId={parseInt(clientId!)} />
        </div>
    );
};


export default ClientPage;