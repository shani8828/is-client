import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  // Use your local backend URL (port 5000 is common for MERN)
  baseURL: 'http://localhost:5000/api',
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