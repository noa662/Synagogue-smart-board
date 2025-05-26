import axios from "axios";

export const fetchZmanim = async (latitude, longitude) => {
  const response = await axios.get("http://localhost:8080/times", {
    params: { lat: latitude, lon: longitude },
  });
  return response.data.BasicZmanim;
};
