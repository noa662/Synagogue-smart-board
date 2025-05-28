import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setSelectedRole((prev) => (prev === role ? null : role));
  };

  const handleSubmit = async () => {
    if (!username || !password || !email || !selectedRole) {
      toast.current.show({
        severity: "warn",
        summary: "שגיאה",
        detail: "אנא מלא את כל השדות",
        life: 3000,
      });
      return;
    }

    const registrationData = {
      username,
      password,
      email,
      role: selectedRole,
      adminPassword: selectedRole === "admin" ? adminPassword : null,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        registrationData
      );

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      dispatch(setUser(user));
      toast.current.show({
        severity: "success",
        summary: "הצלחה",
        detail: "המשתמש נרשם בהצלחה",
        life: 3000,
      });

      setTimeout(() => {
        if (user.role === "admin") navigate("/admin");
        else navigate("/");
      }, 1000);


    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "שגיאה",
        detail:
          err.response?.data?.message || "אירעה שגיאה בהרשמה, נסה שוב",
        life: 4000,
      });
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex justify-content-center mt-8 px-4">
      <Toast ref={toast} />
      <Card title="טופס הרשמה" className="w-full max-w-[500px] shadow-3">
        <div className="flex flex-column gap-4">
          <FloatLabel>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
            <label htmlFor="username">שם משתמש</label>
          </FloatLabel>

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

          <FloatLabel>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <label htmlFor="email">אימייל</label>
          </FloatLabel>

          <div className="flex flex-column gap-2 mt-3">
            <span className="text-sm text-gray-600 mb-1">בחר תפקיד:</span>
            <div className="flex align-items-center gap-2">
              <Checkbox
                inputId="user"
                onChange={() => handleRoleChange("user")}
                checked={selectedRole === "user"}
              />
              <label htmlFor="user" className="cursor-pointer">
                משתמש
              </label>
            </div>
            <div className="flex align-items-center gap-2">
              <Checkbox
                inputId="admin"
                onChange={() => handleRoleChange("admin")}
                checked={selectedRole === "admin"}
              />
              <label htmlFor="admin" className="cursor-pointer">
                מנהל
              </label>
            </div>
          </div>

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