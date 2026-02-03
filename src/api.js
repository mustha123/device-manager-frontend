import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ||
"https://device-management-backend-zbbp.onrender.com",

 headers: {
    "Content-Type": "application/json",
  },
});

export default api;
