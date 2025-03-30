import { useState } from "react";
import AddProject from "../../popaps/AddProject";
import ClientDetails from "../../popaps/ClientDetails";

const ClientOptions = ({ clientId }:{ clientId:number }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 

    const handleAddProject = () => {
        console.log(`Add project for client: ${clientId}`);
        setIsAddModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsAddModalOpen(false); // Close the modal
        setIsDetailsModalOpen(false)
    };
    const handleSuccess = () => {
        setIsAddModalOpen(false); 
    };

    const handleViewDetails = () => {
        console.log(`View details for client: ${clientId}`);
        setIsDetailsModalOpen(true)
    };

    return (
        <div >
            <button className="primary-button" onClick={handleAddProject}>
                Add Project
            </button>
            <button className="primary-button" onClick={handleViewDetails}>
                Client Details
            </button>
            {isAddModalOpen && (
                <AddProject
                    client={{ id: clientId }} // Pass the clientId as a prop
                    onClose={handleCloseModal} // Pass the handleCloseModal function
                    onSuccess={handleSuccess} // Pass the handleSuccess function
                />
            )}
            {isDetailsModalOpen&&(
                <ClientDetails      
                clientId={ clientId } // Pass the clientId as a prop
                onClose={handleCloseModal}/>
            )

            }
        </div>
    );
};

export default ClientOptions;