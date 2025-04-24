import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const MainLayout = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'בית',
      icon: 'pi pi-home',
      command: () => navigate("/")
    },
    {
      label: 'הרשמה',
      icon: 'pi pi-user-plus',
      command: () => navigate("/register")
    },
    {
      label: 'התחברות',
      icon: 'pi pi-sign-in',
      command: () => navigate("/login")
    },
    {
      label: 'זמני תפילה',
      icon: 'pi pi-clock',
      command: () => navigate("/prayers")
    },
    {
      label: 'זמני היום',
      icon: 'pi pi-clock',
      command: () => navigate("/times")
    },
    {
      label: 'ניהול',
      icon: 'pi pi-cog',
      command: () => navigate("/admin")
    },
    {
      label: 'הגדרות',
      icon: 'pi pi-sliders-h',
      command: () => navigate("/settings")
    }
  ];

  return (
    <div>
      <div className="shadow-md">
        <Menubar model={items} />
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
