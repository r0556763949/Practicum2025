// import { useState } from "react";
// import AddProject from "../../popaps/AddProject";
// import ClientDetails from "../../popaps/ClientDetails";

// const ClientOptions = ({ clientId }:{ clientId:number }) => {
//     const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
//     const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 

//     const handleAddProject = () => {
//         console.log(`Add project for client: ${clientId}`);
//         setIsAddModalOpen(true);
//     };
//     const handleCloseModal = () => {
//         setIsAddModalOpen(false); // Close the modal
//         setIsDetailsModalOpen(false)
//     };
//     const handleSuccess = () => {
//         setIsAddModalOpen(false); 
//     };

//     const handleViewDetails = () => {
//         console.log(`View details for client: ${clientId}`);
//         setIsDetailsModalOpen(true)
//     };

//     return (
//         <div >
//             <button className="primary-button" onClick={handleAddProject}>
//                 Add Project
//             </button>
//             <button className="primary-button" onClick={handleViewDetails}>
//                 Client Details
//             </button>
//             {isAddModalOpen && (
//                 <AddProject
//                     client={{ id: clientId }} // Pass the clientId as a prop
//                     onClose={handleCloseModal} // Pass the handleCloseModal function
//                     onSuccess={handleSuccess} // Pass the handleSuccess function
//                 />
//             )}
//             {isDetailsModalOpen&&(
//                 <ClientDetails      
//                 clientId={ clientId } // Pass the clientId as a prop
//                 onClose={handleCloseModal}/>
//             )

//             }
//         </div>
//     );
// };

// export default ClientOptions;

"use client"

import { useState } from "react"
import AddProject from "../../popaps/AddProject"
import ClientDetails from "../../popaps/ClientDetails"
import { FilePlus, UserCog } from "lucide-react"

const ClientOptions = ({ clientId }: { clientId: number }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const handleAddProject = () => {
    setIsAddModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setIsDetailsModalOpen(false)
  }

  const handleSuccess = () => {
    setIsAddModalOpen(false)
  }

  const handleViewDetails = () => {
    setIsDetailsModalOpen(true)
  }

  return (
    <div className="client-options-container">
      <div className="options-group">
        <button className="option-button add-project" onClick={handleAddProject}>
          <FilePlus className="option-icon" />
          <span>הוסף פרויקט</span>
        </button>

        <button className="option-button view-details" onClick={handleViewDetails}>
          <UserCog className="option-icon" />
          <span>פרטי לקוח</span>
        </button>
      </div>

      {isAddModalOpen && <AddProject client={{ id: clientId }} onClose={handleCloseModal} onSuccess={handleSuccess} />}

      {isDetailsModalOpen && <ClientDetails clientId={clientId} onClose={handleCloseModal} />}
    </div>
  )
}

export default ClientOptions
