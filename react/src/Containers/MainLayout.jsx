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
      icon: 'pi pi-calendar-clock', // אייקון של לוח שנה עם שעון
      command: () => navigate("/prayers")
    },
    {
      label: 'זמני היום',
      icon: 'pi pi-sun', // שמש - מתאים לזמני היום
      command: () => navigate("/times")
    },
    {
      label: 'אירועים',
      icon: 'pi pi-calendar-plus', // אייקון שמתאים לאירועים
      command: () => navigate("/events")
    },
    {
      label: 'שליחת פניה',
      icon: 'pi pi-send', // אייקון של שליחה
      command: () => navigate("/addInquiry")
    },
  ];


  return (
    <div>
      <div className="shadow-md fixed top-0 left-0 w-full z-50" style={{ zIndex: '1' }}>
        <Menubar model={items} />
      </div>
      <div className="p-4 mt-20" >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;