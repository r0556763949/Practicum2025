import React from "react";
import ClientList from "../manager/ClientList";

const ManagerHome = () => {
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
    <><ClientList/></>
    // <div style={styles.container}>
    //   <p style={styles.text}>Manager Home</p>
    // </div>
  );
};

export default ManagerHome;
