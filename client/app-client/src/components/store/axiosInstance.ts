// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7156/api', // בסיס הבקשות שלך
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
