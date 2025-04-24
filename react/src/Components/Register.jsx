import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from "../Store/UserSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");

  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      console.log("המשתמש מהstate:", user);
    }
  }, [user]);

  const handleRoleChange = (role) => {
    setSelectedRole(prev => (prev === role ? null : role));
  };

  const handleSubmit = async () => {
    const registrationData = {
      username,
      password,
      email,
      role: selectedRole,
      adminPassword: selectedRole === "admin" ? adminPassword : null,
    };

    try {
      await axios.post("http://localhost:8080/auth/register", registrationData);
      //await axios.post("http://localhost:8080/users", registrationData);
      console.log("המשתמש נרשם בהצלחה");
      dispatch(createUser(registrationData));
    } catch (err) {
      console.error("שגיאה ביצירת משתמש חדש:", err);
    }
  };

  return (
    <div className="flex justify-content-center mt-8">
      <Card title="טופס הרשמה" className="w-full max-w-[500px] shadow-3">
        <div className="flex flex-column gap-4">

          {/* שם משתמש */}
          <FloatLabel>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
            <label htmlFor="username">שם משתמש</label>
          </FloatLabel>

          {/* סיסמה */}
          <FloatLabel>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              className="w-full"
            />
            <label htmlFor="password">סיסמה</label>
          </FloatLabel>

          {/* אימייל */}
          <FloatLabel>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <label htmlFor="email">אימייל</label>
          </FloatLabel>

          {/* תפקיד */}
          <div className="flex flex-column gap-2 mt-3">
            <span className="text-sm text-gray-600 mb-1">בחר תפקיד:</span>
            <div className="flex align-items-center gap-2">
              <Checkbox
                inputId="user"
                value="user"
                onChange={() => handleRoleChange("user")}
                checked={selectedRole === "user"}
              />
              <label htmlFor="user" className="cursor-pointer">משתמש</label>
            </div>
            <div className="flex align-items-center gap-2">
              <Checkbox
                inputId="admin"
                value="admin"
                onChange={() => handleRoleChange("admin")}
                checked={selectedRole === "admin"}
              />
              <label htmlFor="admin" className="cursor-pointer">מנהל</label>
            </div>
          </div>

          {/* סיסמה למנהל */}
          {selectedRole === "admin" && (
            <FloatLabel>
              <Password
                id="admin-password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                toggleMask
                feedback={false}
                className="w-full"
              />
              <label htmlFor="admin-password">סיסמת מנהל</label>
            </FloatLabel>
          )}

          {/* כפתור שליחה */}
          <Button
            label="הירשם"
            icon="pi pi-user-plus"
            className="w-full mt-4"
            onClick={handleSubmit}
          />
        </div>
      </Card>
    </div>
  );
};

export default Register;
