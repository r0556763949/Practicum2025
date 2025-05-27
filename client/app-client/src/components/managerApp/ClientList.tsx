
import type React from "react"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CreateClient from "../popaps/CreateClient"
import { User, UserPlus, Trash2, Eye, Search, Loader, AlertCircle, Users } from "lucide-react"
import {
  fetchAllClients,
  deleteClient,
  Client,
} from "../store/ClientSlice";
import { AppDispatch, RootState } from "../store/Store"
import { useDispatch, useSelector } from "react-redux"

const ClientList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const { clients, loading, error } = useSelector((state: RootState) => state.clients);

  useEffect(() => {
    dispatch(fetchAllClients())
  }, [dispatch])

  const handleDeleteClient = (clientId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("האם אתה בטוח שברצונך למחוק לקוח זה?")) {
      dispatch(deleteClient(clientId));
    }
  };


  const handleClientClick = (client: Client) => {
    navigate(`/ClientPage/${client.id}`)
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="clients-container">
      <div className = "manager-header">
      <Users className="manager-icon" />
      <h2 className="manager-title">ניהול לקוחות</h2>
      </div>
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
            fetchAllClients()
          }}
        />
      )}

      

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
            filteredClients.map((client: Client) => (
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

