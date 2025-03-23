import React from "react";

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const SuccessPopup = ({ message, onClose }: SuccessPopupProps) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div style={styles.icon}>✔️</div>
        <h3 style={styles.message}>{message}</h3>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#28a745",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    color: "white",
    width: "300px",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  message: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "white",
    color: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SuccessPopup;
