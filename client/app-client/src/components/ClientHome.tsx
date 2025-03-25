import React from "react";

const ClientHome = () => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f8ff",
    },
    text: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#003366",
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.text}>Client Home</p>
    </div>
  );
};

export default ClientHome;
