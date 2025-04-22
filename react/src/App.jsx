import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Containers/MainLayout";
import SynagogueBoard from "./Components/SynagogueBoard";
import PrayerTimesBoard from "./Components/PrayerTimesBoard";
import AdminDashboard from "./Components/AdminDashboard";
import SettingsForm from "./Components/SettingsForm";
import Register from "./Components/Register";
import Login from "./Components/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<SynagogueBoard />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="prayers" element={<PrayerTimesBoard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="settings" element={<SettingsForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
