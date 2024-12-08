import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // Replace with your backend base URL
});

// Add Authorization header if token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
