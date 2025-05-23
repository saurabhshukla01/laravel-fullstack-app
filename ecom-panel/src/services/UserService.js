// src/services/UserService.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/users'; // Adjust endpoint as needed

const getToken = () => sessionStorage.getItem('token');
const getAllUsers = async () => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const createUser = async (data) => {
  return axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const updateUser = async (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const showUser = async (id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const deleteUser = async (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
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