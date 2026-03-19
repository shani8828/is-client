import axios from 'axios';
const url = `${import.meta.env.VITE_BACKEND_URI}/api` || 'http://localhost:5000/api';
// Create an instance of axios
const api = axios.create({
  // Use your local backend URL (port 5000 is common for MERN)
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here (e.g., logging out if 401)
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;