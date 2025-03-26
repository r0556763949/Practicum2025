export const fetchClients = async () => {
    const response = await fetch("https://localhost:7156/api/Client", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }
  
    return response.json();
  };
  