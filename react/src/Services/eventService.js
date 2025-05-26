import axios from "axios";

const API_BASE = "http://localhost:8080";

export const getEvents = async () => {
  const response = await axios.get(`${API_BASE}/events`);
  return response.data;
};

export const addEvent = async (event, token) => {
  const response = await axios.post(`${API_BASE}/events`, event, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
