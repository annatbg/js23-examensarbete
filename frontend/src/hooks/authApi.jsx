// src/api/authAPI.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // This would return the user data or JWT token
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export default login;
