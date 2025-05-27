// src/services/CategoryService.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/categories'; // Adjust endpoint as needed

const getToken = () => sessionStorage.getItem('token');

const getDropdownCategories = async () => {
  const token = sessionStorage.getItem('token');

  const response = await axios.get(`${API_URL}?is_dropdown=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getAllCategories = async (page = 1, filter = '', search = '') => {
  const token = sessionStorage.getItem('token');

  const response = await axios.get(`${API_URL}?page=${page}&filter=${filter}&search=${encodeURIComponent(search)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


const createCategory = async (data) => {
  return axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const updateCategory = async (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const showCategory = async (id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const deleteCategory = async (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};


// ✅ This resolves the warning
const CategoryService = {
  getDropdownCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  showCategory,
  deleteCategory,
};

export default CategoryService;