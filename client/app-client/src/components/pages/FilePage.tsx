import { useParams } from 'react-router-dom';
import FileActionsPanel from '../File/FileActionsPanelProps';
import RemarksComponent from '../File/ReMarks';

const FilePage: React.FC = () => {
  const {projectId,fileId, clientId } = useParams<{ projectId:string; fileId: string; clientId: string }>();

  // עכשיו תוכל להעביר את fileId ו-clientId לקומפוננטות שלך
  return (
    <div>
      <FileActionsPanel clientId={Number(clientId)} fileId={Number(fileId)} projectId={Number(projectId)}/>
      <RemarksComponent clientId={Number(clientId)} fileId={Number(fileId)} />
    </div>
  );
};
export default FilePage;
