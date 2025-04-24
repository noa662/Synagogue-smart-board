import { Routes, Route } from "react-router-dom";
import MainLayout from "./Containers/MainLayout";
import SynagogueBoard from "./Components/SynagogueBoard";
import PrayerTimesBoard from "./Components/PrayerTimesBoard";
import TodaysTimes from "./Components/TodaysTimes";
import AdminDashboard from "./Components/AdminDashboard";
import SettingsForm from "./Components/SettingsForm";
import Register from "./Components/Register";
import Login from "./Components/Login";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<SynagogueBoard />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="prayers" element={<PrayerTimesBoard />} />
          <Route path="times" element={<TodaysTimes />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="settings" element={<SettingsForm />} />
        </Route>
      </Routes>
  );
};

export default App;
