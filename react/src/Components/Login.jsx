import React, { useState } from "react";
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import axios from "axios";

const Login = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const userLogin = {
      username: name,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8080/auth/login", userLogin);
      const token = response.data.token;
      console.log("המשתמש התחבר בהצלחה. טוקן:", token);


      localStorage.setItem("token", token);
      console.log("Trying to fetch user by name:", userLogin.username);

      const currentUser = await axios.get(`http://localhost:8080/users/ByName/${encodeURIComponent(userLogin.username)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("משתמש נוכחי:", currentUser.data);
    } catch (err) {
      console.error("שגיאה בהתחברות:", err);
    }
  };


  return (<>
    <div className="card flex justify-content-center w-[700px]">
      <FloatLabel>
        <InputText id="username" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="username">Username</label>
      </FloatLabel>
    </div>
    <br></br>
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
  </>

  );
};

export default Login;
