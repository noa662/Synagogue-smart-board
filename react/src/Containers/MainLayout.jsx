import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      {/* תפריט ניווט */}
      <nav className="bg-gray-200 p-4">
        <ul className="flex gap-4">
        <li><Link to="/register">התחברות</Link></li>
        <li><Link to="/login">הרשמה</Link></li>
          <li><Link to="/">בית</Link></li>
          <li><Link to="/prayers">זמני תפילה</Link></li>
          <li><Link to="/admin">ניהול</Link></li>
          <li><Link to="/settings">הגדרות</Link></li>
        </ul>
      </nav>

      {/* כאן יוצגו הדפים בהתאם לניתוב */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
