import axios from "axios";

const API_BASE = "http://localhost:8080";

export const fetchZmanim = async (latitude, longitude) => {
  const response = await axios.get(`${API_BASE}/times`, {
    params: { lat: latitude, lon: longitude },
  });
  return response.data.BasicZmanim;
};

export const getPrayerTimesByDate = async (date) => {
  const response = await axios.get(`${API_BASE}/prayer-times/getPrayerTimesByDate`, {
    params: { date },
  });
  return response.data;
};

export const postPrayerTimes = async (prayerTime, token) => {
  const response = await axios.post(`${API_BASE}/prayer-times`, prayerTime, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
