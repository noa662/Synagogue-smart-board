import axios from "axios";

const API_BASE = "http://localhost:8080";

export const fetchInquiries = async () => {
  const response = await axios.get(`${API_BASE}/inquiries`);
  return response.data;
};

export const deleteInquiryById = async (id) => {
  const response = await axios.delete(`${API_BASE}/inquiries/${id}`);
  return response.data;
};

export const sendInquiry = async (inquiry, token) => {
  const response = await axios.post(`${API_BASE}/inquiries`, inquiry, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
