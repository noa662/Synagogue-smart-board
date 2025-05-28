import React, { useState, useRef } from "react";
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useDispatch } from 'react-redux';
import { setUser } from "../Store/UserSlice";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {

    if (!username || !password) {
      toast.current.show({
        severity: 'warn',
        summary: 'שגיאה',
        detail: 'אנא מלא את כל השדות',
        life: 3000
      });
      return;
    }

    setLoading(true);

    try {
      const loginResponse = await axios.post("http://localhost:8080/auth/login", {
        username,
        password
      });

      const { token, user } = loginResponse.data;
      localStorage.setItem("token", token);
      dispatch(setUser(user));

      toast.current.show({
        severity: 'success',
        summary: 'הצלחה',
        detail: 'התחברת בהצלחה',
        life: 3000
      });

      setTimeout(() => {
        if (user.role === "admin") navigate("/admin");
        else navigate("/");
      }, 1000);

    } catch (err) {
      console.error("Login error:", err);

      let errorMessage = 'שגיאה בהתחברות';
      if (err.response?.status === 400) {
        errorMessage = 'שם משתמש או סיסמה שגויים';
      } else if (err.response?.status === 500) {
        errorMessage = 'שגיאת שרת, נסה שוב מאוחר יותר';
      }

      toast.current.show({
        severity: 'error',
        summary: 'שגיאה',
        detail: errorMessage,
        life: 4000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-content-center mt-8 px-4">
      <Toast ref={toast} />
      <Card title="התחברות" className="w-full max-w-[500px] shadow-4 p-6 border-round-xl">
        <div className="flex flex-column gap-4">
          {/* שם משתמש */}
          <FloatLabel>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
              disabled={loading}
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
              feedback={false}
              className="w-full"
              disabled={loading}
            />
            <label htmlFor="password">סיסמה</label>
          </FloatLabel>

          {/* כפתור שליחה */}
          <Button
            label={loading ? "... מתחבר" : "התחבר"}
            icon="pi pi-sign-in"
            className="w-full mt-3"
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
          />
        </div>
      </Card>
    </div>
  );
};

export default Login;