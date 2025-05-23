import React, { useState, useEffect, useRef } from "react";
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import axios from "axios";
import { Card } from "primereact/card";
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from "../Store/UserSlice";
import { Toast } from "primereact/toast";

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const toast = useRef(null);

  useEffect(() => {
    if (user) {
      console.log("המשתמש מהstate:", user);
    }
  }, [user]);

  const handleSubmit = async () => {
    const userLogin = {
      username: name,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8080/auth/login", userLogin);
      const token = response.data.token;
      localStorage.setItem("token", token);

      const currentUser = await axios.get(
        `http://localhost:8080/users/ByName/${encodeURIComponent(userLogin.username)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = currentUser.data;
      dispatch(createUser(userData));

      toast.current.show({
        severity: 'success',
        summary: 'הצלחה',
        detail: 'התחברת בהצלחה',
        life: 3000
      });

      if (userData.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      console.error("שגיאה בהתחברות:", err);
      toast.current.show({
        severity: 'error',
        summary: 'שגיאה',
        detail: 'שגיאה בהתחברות',
        life: 3000
      });
    }

    if (selectedRole === "admin")
      window.location.href = "/Admin";
    else
      window.location.href = "/";
  };

  return (
    <Card className="w-full max-w-[500px] shadow-3">
      <Toast ref={toast} />
      <div className="card flex justify-content-center w-[700px]">
        <FloatLabel>
          <InputText id="username" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="username">Username</label>
        </FloatLabel>
      </div>
      <br />
      <div className="card flex justify-content-center w-[700px]">
        <FloatLabel>
          <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} />
          <label htmlFor="password">Password</label>
        </FloatLabel>
      </div>
      {/* כפתור שליחה */}
      <Button
        label="התחבר"
        icon="pi pi-user-plus"
        className="w-full mt-4"
        onClick={handleSubmit}
      />
    </Card>
  );
};

export default Login;
