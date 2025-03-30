import  { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../store/ProjectSlice"; // import createProject action
import { AppDispatch } from "../store/Store";

const AddProject = ({ client, onClose, onSuccess }: { client: any, onClose: any, onSuccess: any }) => {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [startAt, setStartAt] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    try {
      const projectData = { description, address, startAt };
      await dispatch(createProject({ clientId: client.id, projectData }));
      setMessage("Project created successfully!");
      onSuccess();
    } catch (err) {
      setMessage("Failed to create project.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Add Project for {client.name}</h2>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleSave} className="save-button">
            Save
          </button>
        </div>
        {message && (
          <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProject;
