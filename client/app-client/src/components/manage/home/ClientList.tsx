// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ClientDto } from "../../store/interfaces";
// import CreateClient from "../../popaps/CreateClient";

// const ClientList = () => {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const response = await fetch("https://localhost:7156/api/Client", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch clients");
//       }

//       const data = await response.json();
//       setClients(data);
//       setLoading(false);
//     } catch (err: any) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };


//   const handleDeleteClient = async (clientId: number) => {
//     if (window.confirm("Are you sure you want to delete this client?")) {
//       try {
//         const response = await fetch(`https://localhost:7156/api/Client/${clientId}`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to delete client");
//         }

//         setClients((prevClients) => prevClients.filter((client:any) => client.id !== clientId));
//       } catch (err: any) {
//         setError(err.message);
//       }
//     }
//   };

//   const handleClientClick = (client: ClientDto) => {
//     navigate(`/ClientPage/${client.id}`);
//   };

//   if (loading) return <p>Loading clients...</p>;
//   if (error) return <p style={{ color: "red", fontSize: "12px" }}>{error}</p>;

//   return (
//     <div className="ClientList-container">
//       <button
//         className="primary-button"
//         onClick={() => setIsPopupOpen(true)}
//         style={{ marginTop: "20px" }}
//       >
//         הוסף לקוח
//       </button>
//       {isPopupOpen && <CreateClient onClose={() => { setIsPopupOpen(false); fetchClients(); }} />}
//       <h1 className="title">Client List</h1>
//       <div className="listContainer">
//         <ul className="list">
//           {clients.map((client: ClientDto) => (
//             <li key={client.id} className="listItem">
//               <div className="clientInfo">
//                 <strong className="clientName">{client.name}</strong>
//               </div>
//               <div>
//                 <button onClick={() => handleDeleteClient(client.id)} className="primary-button">
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleClientClick(client)}
//                   className="primary-button"
//                 >
//                   View Client
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//         {clients.length > 10 && (
//           <div className="scrollContainer">
//             <p className="scrollText">Scroll for more...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };



// export default ClientList;


"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { ClientDto } from "../../store/interfaces"
import CreateClient from "../../popaps/CreateClient"
import { User, UserPlus, Trash2, Eye, Search, Loader, AlertCircle } from "lucide-react"

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://localhost:7156/api/Client", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch clients")
      }

      const data = await response.json()
      setClients(data)
      setError("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClient = async (clientId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm("האם אתה בטוח שברצונך למחוק לקוח זה?")) {
      try {
        const response = await fetch(`https://localhost:7156/api/Client/${clientId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to delete client")
        }

        setClients((prevClients) => prevClients.filter((client: any) => client.id !== clientId))
      } catch (err: any) {
        setError(err.message)
      }
    }
  }

  const handleClientClick = (client: ClientDto) => {
    navigate(`/ClientPage/${client.id}`)
  }

  const filteredClients = clients.filter((client: ClientDto) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="clients-container">
      <div className="clients-header">
        <button className="add-client-button" onClick={() => setIsPopupOpen(true)}>
          <UserPlus className="button-icon" />
          <span>הוסף לקוח</span>
        </button>

        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="חיפוש לקוחות..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {isPopupOpen && (
        <CreateClient
          onClose={() => {
            setIsPopupOpen(false)
            fetchClients()
          }}
        />
      )}

      <h2 className="clients-title">רשימת לקוחות</h2>

      {loading && (
        <div className="clients-loading">
          <Loader className="loading-icon" />
          <p>טוען לקוחות...</p>
        </div>
      )}

      {error && (
        <div className="clients-error">
          <AlertCircle className="error-icon" />
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="clients-list">
          {filteredClients.length === 0 ? (
            <div className="clients-empty">
              <User className="empty-icon" />
              <p>לא נמצאו לקוחות</p>
            </div>
          ) : (
            filteredClients.map((client: ClientDto) => (
              <div key={client.id} className="client-card" onClick={() => handleClientClick(client)}>
                <div className="client-avatar">
                  <User className="avatar-icon" />
                </div>
                <div className="client-info">
                  <h3 className="client-name">{client.name}</h3>
                  <p className="client-email">{client.email}</p>
                </div>
                <div className="client-actions">
                  <button
                    className="client-action-button view"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClientClick(client)
                    }}
                  >
                    <Eye className="action-icon" />
                  </button>
                  <button className="client-action-button delete" onClick={(e) => handleDeleteClient(client.id, e)}>
                    <Trash2 className="action-icon" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {filteredClients.length > 10 && (
        <div className="clients-scroll-hint">
          <p>גלול למטה לעוד לקוחות...</p>
        </div>
      )}
    </div>
  )
}

export default ClientList

