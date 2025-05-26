import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  const items = [
    { label: 'הגדרות', icon: 'pi pi-cog', command: () => navigate("/admin/settings") },
    { label: 'פניות', icon: 'pi pi-envelope', command: () => navigate("/admin/inquiries") },
    { label: 'עדכון זמני תפילה', icon: 'pi pi-clock', command: () => navigate("/admin/updateTimes") },
    { label: 'הוספת אירוע', icon: 'pi pi-calendar-plus', command: () => navigate("/admin/addEvent") },
    { label: 'למסך הראשי', icon: 'pi pi-sign-out', command: () => navigate("/") },
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

export default AdminLayout;
