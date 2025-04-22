import React, { useState } from "react";
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

const Login = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

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
     <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
       <label htmlFor="password">Password</label> 
    </FloatLabel>
        </div>
  </>

  );
};

export default Login;
