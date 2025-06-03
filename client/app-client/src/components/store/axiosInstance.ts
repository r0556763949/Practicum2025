// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // בסיס הבקשות שלך
  // baseURL:"https://localhost:7156/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// הוספת אינטרספטור - מוסיף טוקן לכל בקשה
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // או ממקום אחר שאתה שומר בו את הטוקן
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
