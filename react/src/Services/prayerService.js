// services/prayerTimesService.js
import axios from "axios";

const API_BASE = "http://localhost:8080";

export const getPrayerTimesByDate = async (date) => {
  const response = await axios.get(`${API_BASE}/prayer-times/getPrayerTimesByDate`, {
    params: { date },
  });
  return response.data;
};
