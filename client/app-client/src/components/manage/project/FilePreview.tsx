import React, { useEffect } from "react";
import '../../../styles/FilePreview.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { fetchFileUrl } from "../../store/FileSlice";
import { useNavigate } from "react-router-dom";

interface FilePreviewProps {
    clientId: number;
    projectId: number;
    fileId: number | null;
}

const FilePreview: React.FC<FilePreviewProps> = ({ clientId, projectId, fileId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const fileUrl = useSelector((state: RootState) => state.files.selectedFileUrl); // מתוך ה-slice
    const loading = useSelector((state: RootState) => state.files.loading);
    const error = useSelector((state: RootState) => state.files.error);
    const navigate = useNavigate();

    useEffect(() => {
        if (fileId) {
            console.log("fileId of view: ", fileId);
            dispatch(fetchFileUrl({ clientId, projectId, id: fileId })); // פעולה שמביאה את ה-url מהשרת
        }
    }, [dispatch, clientId, projectId, fileId]);

    // const handleManageFile = () => {
    //     if (fileId !== null) {
    //         navigate(`FilePage/${fileId}`);
    //     }
    // };

    return (
        <div className="file-preview-panel">
            {loading && <p>טוען...</p>}
            {/* {fileUrl && <button
                onClick={handleManageFile}
                className="manage-file-button"
                style={{
                    marginTop: '2px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                מעבר לקובץ
            </button>} */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {fileUrl && (
                <iframe
                    src={fileUrl}
                    title="תצוגת קובץ"
                    width="100%"
                    height="600px"
                    style={{ border: '1px solid #ccc' }}
                />
            )}
            {!loading && !fileUrl && <p>אין קובץ להצגה</p>}
        </div>
    );
};

export default FilePreview;
