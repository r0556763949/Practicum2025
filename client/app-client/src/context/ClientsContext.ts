// context/ClientsContext.js
import React, { createContext, useState, useCallback } from "react";

// יצירת הקונטקסט
export const ClientsContext = createContext();

// ספק הקונטקסט
export const ClientsProvider = ({ children }:{ children :any}) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // פונקציה לשליפת לקוחות מהשרת
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://localhost:7156/api/Client", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }

      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // חשיפת הנתונים והפונקציות
  return (
    <ClientsContext.Provider value={{ clients, fetchClients, loading, error }}>
      {children}
    </ClientsContext.Provider>
  );
};
