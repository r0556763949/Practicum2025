import React from "react";

const ClientContent = () => {
    return (
        <div style={styles.centerPanel}>
            <h2 style={styles.placeholderText}>Content goes here...</h2>
        </div>
    );
};

const styles = {
    centerPanel: {
        width: "60%",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        fontSize: "18px",
        color: "#888",
    },
};

export default ClientContent;