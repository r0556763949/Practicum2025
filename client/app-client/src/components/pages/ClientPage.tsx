import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectList from "../Client/ProjectList";
import ClientContent from "../Client/ClientContent";
import ClientOptions from "../Client/ClientOptions";

const ClientPage = () => {
    const { clientId } = useParams();

    return (
        <div style={styles.container}>
            {/* רשימת הפרויקטים בצד שמאל */}
            <ProjectList clientId={clientId} />

            {/* מרכז העמוד */}
            <ClientContent />

            {/* כפתורים בצד ימין */}
            <ClientOptions clientId={clientId} />
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
    },
};

export default ClientPage;