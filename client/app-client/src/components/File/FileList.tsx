import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles } from "../store/FileSlice";
import { RootState, AppDispatch } from "../store/Store";
import { useNavigate } from "react-router-dom";

const FileList: React.FC<{ clientId: number; projectId: number }> = ({
  clientId,
  projectId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { files, loading, error } = useSelector(
    (state: RootState) => state.files
  );
  const handleFileClick = (fileId: number) => {
    navigate(`FilePage/${fileId}`);
  };
  useEffect(() => {
    dispatch(fetchFiles({ clientId, projectId }));
  }, [dispatch, clientId, projectId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="file-list">
      {files.map((file) => (
        <div
          key={file.id}
          className="file-item"
          onClick={() => handleFileClick(file.id)} // לחיצה על קובץ
        >
          <div className="file-content">
            <div className="file-name">{file.name}</div>
            <div className="file-description">{file.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;

