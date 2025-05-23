// src/services/userService.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/users'; // Adjust endpoint as needed

const getToken = () => sessionStorage.getItem('token');

export const getAllUsers = async () => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const createUser = async (data) => {
  return axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const updateUser = async (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const showUser = async (id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const deleteUser = async (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};
