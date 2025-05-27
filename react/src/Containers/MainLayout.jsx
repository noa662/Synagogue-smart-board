import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const MainLayout = () => {
  const navigate = useNavigate();

  const items = [
    { label: 'בית', icon: 'pi pi-home', command: () => navigate("/") },
    { label: 'הרשמה', icon: 'pi pi-user-plus', command: () => navigate("/register") },
    { label: 'התחברות', icon: 'pi pi-sign-in', command: () => navigate("/login") },
    { label: 'זמני תפילה', icon: 'pi pi-calendar-clock', command: () => navigate("/prayers") },
    { label: 'זמני היום', icon: 'pi pi-sun', command: () => navigate("/times") },
    { label: 'אירועים', icon: 'pi pi-calendar-plus', command: () => navigate("/events") },
    { label: 'שליחת פניה', icon: 'pi pi-send', command: () => navigate("/addInquiry") },
  ];

  return (
    <div className="w-full min-h-screen text-white">
      <div className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <Menubar model={items} className="bg-black/40 border-none shadow-md rounded-none text-lg" />
      </div>
      <div className="pt-24 px-12">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

