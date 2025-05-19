// services/UserService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getAllUsers = () => {
  return axios.get(`${API_BASE_URL}/users`);
};

const deleteUser = (id) => {
  return axios.delete(`${API_BASE_URL}/users/${id}`);
};

export default {
  getAllUsers,
  deleteUser,
};
