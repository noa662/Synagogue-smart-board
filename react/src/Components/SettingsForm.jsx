import { ColorPicker } from 'primereact/colorpicker';
import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from "@mui/material/Button";
const SettingForm = () => {
    const [colorHEX, setColorHEX] = useState('6466f1');
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState('');
    
  const handleSubmit = async () => {
    const registrationData = {
     colorHEX,
     value,
     checked,
    };
    try {
      const response = await axios.post("http://localhost:8080/settings", registrationData);
      console.log("הגדרות חדשות");
      const token = response.data.token;
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("ההגדרות לא נשמרו", err);
    }

  };
    return (
        <>
            <div className="flex-1 flex flex-column align-items-center">
                <label htmlFor="cp-hex" className="font-bold block mb-2">
                    HEX
                </label>
                <ColorPicker inputId="cp-hex" format="hex" value={colorHEX} onChange={(e) => setColorHEX(e.value)} className="mb-3" />
                <span>{colorHEX}</span>
            </div>
            <br/>
              <div className="card flex justify-content-center">
            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
        </div>
           <br/>
         <div className="card flex justify-content-center">
            <InputTextarea autoResize value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
        </div>
          {/* כפתור שליחה */}
            <Button
              label="התחבר"
              icon="pi pi-user-plus"
              className="w-full mt-4"
              color='black'
              onClick={handleSubmit}
            />
        </>
    );
};
export default SettingForm;