const API_URL = "https://localhost:7156/api";

// פונקציה שתטפל בקריאות API ותשלול שגיאות
const fetchFromAPI = async (url: string, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    // אם הסטטוס לא תקין, להחזיר שגיאה עם המידע
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
    
    return await response.json(); // מחזיר את המידע אם הקריאה הצליחה
  } catch (error: any) {
    // טיפול בשגיאות, אפשר להוסיף פה לוגים או לשלוח למערכת ניהול שגיאות
    console.error("API Error:", error.message);
    throw error; // זורק את השגיאה בחזרה, כדי שהקריאה תוכל להיתפס במקום אחר
  }
};

// בקשת Presigned URL להעלאת קובץ
export const getUploadUrl = async (clientId: any, projectId: any, fileName: any) => {
  return fetchFromAPI(`${API_URL}/clients/${clientId}/projects/${projectId}/files/upload-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName }), // חייב להיות אובייקט עם { fileName }
  });
};

// אישור העלאת קובץ
export const confirmUpload = async (clientId: any, projectId: any, fileName: any, description: any, filePath: any) => {
  return fetchFromAPI(`${API_URL}/clients/${clientId}/projects/${projectId}/files/confirm-upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, description, filePath }),
  });
};

// שליפת קבצים בפרויקט
export const fetchFiles = async (clientId: any, projectId: any) => {
  return fetchFromAPI(`${API_URL}/clients/${clientId}/projects/${projectId}/files`);
};

// מחיקת קובץ
export const deleteFile = async (clientId: any, projectId: any, fileId: any) => {
  return fetchFromAPI(`${API_URL}/clients/${clientId}/projects/${projectId}/files/${fileId}`, {
    method: 'DELETE',
  });
};

// קבלת קישור להורדה
export const getDownloadUrl = async (clientId: any, projectId: any, fileId: any) => {
  return fetchFromAPI(`${API_URL}/clients/${clientId}/projects/${projectId}/files/${fileId}/download`);
};

// קבלת קישור לצפייה בקובץ
export const getViewUrl = async (clientId: any, projectId: any, fileId: any) => {
  return fetchFromAPI(`${API_URL}/clients/${clientId}/projects/${projectId}/files/${fileId}/view`);
};

