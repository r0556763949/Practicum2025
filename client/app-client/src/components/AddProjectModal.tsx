import React, { useState } from "react";
import SuccessPopup from "./SuccessPopupProps";

const AddProjectModal = ({ client, onClose, onSuccess }:{client:any,onClose:any,onSuccess:any}) => {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [startAt, setStartAt] = useState("");
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://localhost:7156/api/clients/${client}/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            address,
            startAt,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to create project");
      }
  
      const newProject = await response.json();
     setShowSuccess(true); // הצגת פופאפ של הצלחה

    } catch (err) {
      alert(err.message);
    }
  }; 
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onSuccess(); // סגירת הפופאפ של הצלחה
    onClose(); // סגירת המודל
    
  };


  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Add Project for {client.name}</h2>
        <div style={styles.formGroup}>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Start Date:</label>
          <input
            type="date"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.actions}>
          <button onClick={onClose} style={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSave} style={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
      {showSuccess && (
        <SuccessPopup message="Project created successfully!" onClose={handleCloseSuccess} />
      )}
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AddProjectModal;
