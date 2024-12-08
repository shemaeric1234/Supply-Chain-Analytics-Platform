import axios from "axios";

const NoTokenAPI = axios.create({
  baseURL: "http://localhost:8000", // Replace with your backend base URL
});

export default NoTokenAPI;
