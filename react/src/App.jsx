import { Routes, Route } from "react-router-dom";
import MainLayout from "./Containers/MainLayout";
import AdminLayout from "./Containers/AdminLayout";
import SynagogueBoard from "./Components/SynagogueBoard";
import PrayerTimesBoard from "./Components/PrayerTimesBoard";
import TodaysTimes from "./Components/TodaysTimes";
import SettingsForm from "./Components/SettingsForm";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Inquiries from "./Components/Inquiries";
import AddEvent from "./Components/AddEvent";
import UpdateTimes from "./Components/UpdateTimes";
import Events from "./Components/Events";
import AddInquiry from "./Components/AddInquiry";
import DefaultAdminPage from "./Components/DefaultAdminPage";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from "./Store/UserSlice";
import axios from 'axios';

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserFromToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found in localStorage");
        return;
      }
      try {
        console.log("Attempting to verify token...");
        const response = await axios.get("http://localhost:8080/auth/getUserFromToken", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log("Token verification successful:", response.data);
        dispatch(setUser(response.data));
      } catch (err) {
        console.error("Token verification failed:", err);
        if (err.response?.status === 401) {
          console.log("Token expired or invalid, removing from storage");
          localStorage.removeItem("token");
        } else if (err.code === 'ERR_NETWORK') {
          console.log("Network error - server might be down");
        }
      }
    };

    fetchUserFromToken();
  }, [dispatch]);

  return (
    <Routes>
      {/* תפריט רגיל */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SynagogueBoard />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="prayers" element={<PrayerTimesBoard />} />
        <Route path="times" element={<TodaysTimes />} />
        <Route path="addInquiry" element={<AddInquiry />} />
        <Route path="events" element={<Events />} />
      </Route>

      {/* תפריט מנהל */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DefaultAdminPage />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="updateTimes" element={<UpdateTimes />} />
        <Route path="addEvent" element={<AddEvent />} />
        <Route path="settings" element={<SettingsForm />} />
      </Route>
    </Routes>
  );
};

export default App;