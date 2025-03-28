

const ClientOptions = ({ clientId }:{ clientId:number }) => {
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
        width: "18%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
       // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
};

export default ClientOptions;