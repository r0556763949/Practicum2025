import React from "react";

const ClientOptions = ({ clientId }) => {
    const handleAddProject = () => {
        console.log(`Add project for client: ${clientId}`);
        // Add navigation or functionality for adding a project
    };

    const handleViewDetails = () => {
        console.log(`View details for client: ${clientId}`);
        // Add functionality for viewing client details
    };

    return (
        <div style={styles.rightPanel}>
            <button className="primary-button" onClick={handleAddProject}>
                Add Project
            </button>
            <button className="primary-button" onClick={handleViewDetails}>
                Client Details
            </button>
        </div>
    );
};

const styles = {
    rightPanel: {
        width: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    button: {
        padding: "10px 15px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#003366",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        width: "100%",
    },
};

export default ClientOptions;