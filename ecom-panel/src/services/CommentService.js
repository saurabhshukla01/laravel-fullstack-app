// src/services/CommentService.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/comments'; // Adjust endpoint as needed

const getToken = () => sessionStorage.getItem('token');

const getAllComments = async (page = 1, filter = '', search = '') => {
  const token = sessionStorage.getItem('token');

  const response = await axios.get(`${API_URL}?page=${page}&filter=${filter}&search=${encodeURIComponent(search)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


const createComment = async (data) => {
  return axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const updateComment = async (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const showComment = async (id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const deleteComment = async (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};


// ✅ This resolves the warning
const CommentService = {
  getAllComments,
  createComment,
  updateComment,
  showComment,
  deleteComment,
};

export default CommentService;