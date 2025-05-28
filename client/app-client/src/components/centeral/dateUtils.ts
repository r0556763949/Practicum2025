
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "תאריך לא תקין"
    }
  
    // Format the date as DD/MM/YYYY HH:MM
    return new Intl.DateTimeFormat("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }
  