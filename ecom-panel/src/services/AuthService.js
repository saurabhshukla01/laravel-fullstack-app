// src/services/AuthService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed." };
  }
};

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed." };
  }
};

// ✅ This resolves the warning
const AuthService = {
  login,
  register
};

export default AuthService;