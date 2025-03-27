import React from "react";
import ProjectList from "../Client/ProjectList";
import decodeToken from "../centeral/authUtils";

const ClientHome = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;
  const payload = decodeToken(token);
  if (!payload) return null;
  const id = payload.sub

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
                  <ProjectList
                clientId={id}
            />
      <p style={styles.text}>Client Home</p>
    </div>
  );
};

export default ClientHome;
