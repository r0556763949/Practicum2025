import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectList from "../Client/ProjectList";

const ClientDetails = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientProjects = async () => {
            try {
                const response = await fetch(
                    `https://localhost:7156/api/clients/${clientId}/projects`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch client details");
                }

                const data = await response.json();
                console.log("fetch: ", data);

                // setClient(data.client);
                setProjects(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchClientProjects();
    }, [clientId]);

    const handleAddProject = () => {
        console.log("add");

        // navigate(`/client/${clientId}/add-project`);
    };


    if (loading) return <p>Loading client details...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (

        <div style={styles.container}>
            {/* רשימת הפרויקטים בצד שמאל */}
            <ProjectList
                clientId={clientId}
            />

            {/* מרכז העמוד */}
            <div style={styles.centerPanel}>
                <h2 style={styles.title}>{client?.name} Details</h2>
                <div style={styles.clientInfo}>
                    <p>
                        <span style={styles.clientName}>Client ID: </span>
                        {client?.id}
                    </p>
                    <p>
                        <span style={styles.clientName}>Email: </span>
                        {client?.email}
                    </p>
                </div>
            </div>
            {/* כפתורים בצד ימין */}
            <div style={styles.rightPanel}>
                <button className="primary-button" onClick={handleAddProject}>
                    Add Project
                </button>
                <button className="primary-button">Client Details</button>
            </div>
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
    rightPanel: {
        width: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
    },
    centerPanel: {
        width: "60%",
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
    title: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#003366",
    },
    clientInfo: {
        fontSize: "16px",
        color: "#003366",
    },
    clientName: {
        fontWeight: "bold",
    },
    listContainer: {
        maxHeight: "400px",
        overflowY: "auto",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    listItem: {
        marginBottom: "15px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    projectButton: {
        padding: "10px 15px",
        fontSize: "14px",
        cursor: "pointer",
        width: "100%",
        backgroundColor: "#003366",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
    },
};

export default ClientDetails;

