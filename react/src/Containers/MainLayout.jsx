// import { Outlet, Link } from "react-router-dom";

// const MainLayout = () => {
//   return (
//     <div>
//       {/* תפריט ניווט */}
//       <nav className="bg-gray-200 p-4">
//         <ul className="flex gap-4">
//         <li><Link to="/register">התחברות</Link></li>
//         <li><Link to="/login">הרשמה</Link></li>
//           <li><Link to="/">בית</Link></li>
//           <li><Link to="/prayers">זמני תפילה</Link></li>
//           <li><Link to="/admin">ניהול</Link></li>
//           <li><Link to="/settings">הגדרות</Link></li>
//         </ul>
//       </nav>

//       {/* כאן יוצגו הדפים בהתאם לניתוב */}
//       <div className="p-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // או כל ערכת נושא אחרת
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
