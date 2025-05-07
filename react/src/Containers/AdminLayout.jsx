import MainLayout from "./MainLayout";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'הגדרות',
      icon: 'pi pi-cog',
      command: () => navigate("/admin/settings")
    },
    {
      label: 'פניות',
      icon: 'pi pi-envelope',
      command: () => navigate("/admin/inquiries")
    },
    {
      label: 'עדכון זמני תפילה',
      icon: 'pi pi-envelope',
      command: () => navigate("/admin/updateTimes")
    },
    {
      label: 'הוספת אירוע',
      icon: 'pi pi-briefcase',
      command: () => navigate("/admin/addEvent")
    },
    {
      label: 'למסך הראשי',
      icon: 'pi pi-sign-out',
      command: () => navigate("/")
    }
  ];

  return (
    <>
      {/* <MainLayout /> */}
      <div>
        <div className="shadow-md fixed top-0 left-0 w-full z-50" style={{ zIndex: '1' }}>
          <Menubar model={items} />
        </div>
        <div className="p-4 mt-20" >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;