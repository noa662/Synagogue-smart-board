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

const App = () => {
  return (
    <Routes>
      {/* תפריט רגיל */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SynagogueBoard />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="prayers" element={<PrayerTimesBoard />} />
        <Route path="times" element={<TodaysTimes />} />
      </Route>
      {/* תפריט מנהל */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="addEvent" element={<AddEvent />} />
        <Route path="settings" element={<SettingsForm />} />
      </Route>
    </Routes>
  );
};

export default App;
