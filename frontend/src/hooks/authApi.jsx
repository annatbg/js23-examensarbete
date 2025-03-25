import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const AuthApi = {
  login: async (email, password) => {
    try {
      console.log("Skickar login-förfrågan till backend med följande data:", {
        email,
        password,
      });
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  signup: async ({ email, password, firstName, lastName }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        firstName,
        lastName,
      });
      return response.data; // API bör returnera en bekräftelse eller JWT-token
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },
};

export default AuthApi;
