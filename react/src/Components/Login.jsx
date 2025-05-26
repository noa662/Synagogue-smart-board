import React, { useState, useEffect, useRef } from "react";
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from "../Store/UserSlice";
import { loginUser, getUserByName } from "../Services/userService";

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const toast = useRef(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      console.log("המשתמש מהstate:", user);
    }
  }, [user]);

  const handleSubmit = async () => {
    const userLogin = { username: name, password };

    try {
      const { token } = await loginUser(userLogin);
      localStorage.setItem("token", token);

      const userData = await getUserByName(userLogin.username, token);
      dispatch(createUser(userData));

      toast.current.show({
        severity: 'success',
        summary: 'הצלחה',
        detail: 'התחברת בהצלחה',
        life: 3000
      });

      window.location.href = userData.role === "admin" ? "/admin" : "/";

    } catch (err) {
      console.error("שגיאה בהתחברות:", err);
      toast.current.show({
        severity: 'error',
        summary: 'שגיאה',
        detail: 'שגיאה בהתחברות',
        life: 3000
      });
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              feedback={false}
              className="w-full"
            />
            <label htmlFor="password">סיסמה</label>
          </FloatLabel>

          {/* כפתור שליחה */}
          <Button
            label="התחבר"
            icon="pi pi-sign-in"
            className="w-full mt-3"
            onClick={handleSubmit}
          />
        </div>
      </Card>
    </div>
  );
};

export default Login;
