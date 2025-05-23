// services/UserService.js
import axios from 'axios';

const API = 'http://127.0.0.1:8000/api';

const getAllUsers = () => {
  return axios.get(`${API}/users`);
};

const createUser = (data) => {
  return axios.post(`${API}/users`, data);
};

const updateUser = (id, data) => {
  return axios.put(`${API}/users/${id}`, data);
};

const showUser = (id) => {
  return axios.get(`${API}/users/${id}`);
};

const deleteUser = (id) => {
  return axios.delete(`${API}/users/${id}`);
};

// ✅ This resolves the warning
const UserService = {
  getAllUsers,
  createUser,
  updateUser,
  showUser,
  deleteUser,
};

export default UserService;


