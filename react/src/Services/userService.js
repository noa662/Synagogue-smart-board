import axios from "axios";

const API_BASE = "http://localhost:8080";

export const registerUser = async (data) => {
  const response = await axios.post(`${API_BASE}/auth/register`, data);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE}/auth/login`, credentials);
  return response.data;
};

export const getUserByName = async (username, token) => {
  const response = await axios.get(`${API_BASE}/users/ByName/${encodeURIComponent(username)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
