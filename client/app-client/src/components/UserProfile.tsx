// UserProfile.jsx
import React from "react";
import decodeToken from "./authUtils"; // ודאי שהנתיב נכון

const UserProfile = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  const payload = decodeToken(token);
  if (!payload) return null;

  // נניח שנרצה את האות הראשונה של האימייל
  const initial = payload.email.charAt(0).toUpperCase();

  const styles = {
    profileCircle: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        color: "#003366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #003366",
        fontWeight: "bold",
        fontSize: "18px",
        cursor: "pointer",
        marginRight: "40px",  // מוסיף מרווח לימין
      },
  };

  return <div style={styles.profileCircle}>{initial}</div>;
};

export default UserProfile;
