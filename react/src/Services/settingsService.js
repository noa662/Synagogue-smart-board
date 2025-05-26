import axios from 'axios';

const API_BASE = 'http://localhost:8080';

export const uploadImage = async (file, token) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.imageUrl;
};

export const saveSettings = async (settingsData, token) => {
  const response = await axios.post(`${API_BASE}/settings`, settingsData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
