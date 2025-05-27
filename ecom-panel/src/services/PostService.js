// src/services/PostService.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/posts'; // Adjust endpoint as needed

const getToken = () => sessionStorage.getItem('token');

const getAllPosts = async (page = 1, filter = '', search = '') => {
  const token = sessionStorage.getItem('token');

  const response = await axios.get(`${API_URL}?page=${page}&filter=${filter}&search=${encodeURIComponent(search)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


const createPost = async (data) => {
  return axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const updatePost = async (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const showPost = async (id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const deletePost = async (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};


// ✅ This resolves the warning
const PostService = {
  getAllPosts,
  createPost,
  updatePost,
  showPost,
  deletePost,
};

export default PostService;