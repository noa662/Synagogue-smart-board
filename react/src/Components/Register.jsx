import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from "../Store/UserSlice";
import { Toast } from "primereact/toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");

  const toast = useRef(null);
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
      //await axios.post("http://localhost:8080/auth/register", registrationData);
      //await axios.post("http://localhost:8080/users", registrationData);
      const response = await axios.post("http://localhost:8080/auth/register", registrationData);
      console.log("המשתמש נרשם בהצלחה");
      toast.current.show({
        severity: "success",
        summary: "הצלחה",
        detail: "המשתמש נרשם בהצלחה",
        life: 3000,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("שגיאה ביצירת משתמש חדש:", err);
      toast.current.show({
        severity: "error",
        summary: "שגיאה",
        detail: "אירעה שגיאה בהרשמה, נסה שוב",
        life: 3000,
      });
    }

    if (selectedRole === "admin")
      window.location.href = "/Admin";
    else
      window.location.href = "/";
  };

  return (
    <div className="flex justify-content-center mt-8">
      <Toast ref={toast} />
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

