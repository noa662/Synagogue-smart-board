// import React, { useState, useRef } from "react";
// import { InputTextarea } from "primereact/inputtextarea";
// import { InputText } from "primereact/inputtext";
// import { Calendar } from "primereact/calendar";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { Card } from "primereact/card";
// import { addEvent } from "../Services/eventService";

// const AddEvent = () => {
//   const [eventName, setEventName] = useState("");
//   const [date, setDate] = useState(null);
//   const [time, setTime] = useState(null);
//   const [description, setDescription] = useState("");
//   const toast = useRef(null);

//   const handleSubmit = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.current.show({
//         severity: "error",
//         summary: "שגיאה",
//         detail: "אין הרשאה, יש להתחבר.",
//         life: 3000,
//       });
//       return;
//     }

//     if (!eventName || !date || !time) {
//       toast.current.show({
//         severity: "warn",
//         summary: "שדות חסרים",
//         detail: "אנא מלא/י שם אירוע, תאריך ושעה.",
//         life: 3000,
//       });
//       return;
//     }

//     const event = {
//       eventName,
//       date: date.toISOString(),
//       time: time.toISOString(),
//       description,
//     };

//     try {
//       await addEvent(event, token);
//       toast.current.show({
//         severity: "success",
//         summary: "נשמר",
//         detail: "האירוע נשמר בהצלחה",
//         life: 3000,
//       });

//       setEventName("");
//       setDate(null);
//       setTime(null);
//       setDescription("");
//     } catch (err) {
//       console.error("שגיאה בשמירת האירוע:", err);
//       toast.current.show({
//         severity: "error",
//         summary: "שגיאה",
//         detail: "שגיאה בשמירת האירוע. נסה/י שוב.",
//         life: 3000,
//       });
//     }
//   };

//   return (
//     <div style={{ paddingTop: "10vh" }} className="flex justify-center px-4">
//       <Card title="הוספת אירוע" className="w-full max-w-[500px] shadow-3">
//         <Toast ref={toast} position="top-center" />
//         <div className="card flex justify-content-center ">
//           <InputText
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//             placeholder="שם אירוע"
//           />
//         </div>
//         <br />
//         <div className="card flex justify-content-center">
//           <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder="בחר תאריך" />
//         </div>
//         <br />
//         <div className="card flex justify-content-center">
//           <Calendar
//             value={time}
//             onChange={(e) => setTime(e.value)}
//             timeOnly
//             hourFormat="24"
//             placeholder="בחר שעה"
//           />
//         </div>
//         <br />
//         <div className="card flex justify-content-center">
//           <InputTextarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={5}
//             cols={30}
//             placeholder="תיאור האירוע"
//           />
//         </div>
//         <br />
//         <Button label="שמור" icon="pi pi-user-plus" className="w-full mt-4" onClick={handleSubmit} />
//       </Card>
//     </div>
//   );
// };

// export default AddEvent;

import React, { useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { useAddEvent } from "../Hooks/useAddEvent";

const AddEvent = () => {
  const toast = useRef(null);

  const {
    eventName,
    setEventName,
    date,
    setDate,
    time,
    setTime,
    description,
    setDescription,
    handleSubmit,
    loading,
  } = useAddEvent(toast);

  return (
    <div style={{ paddingTop: "10vh" }} className="flex justify-center px-4">
      <Card title="הוספת אירוע" className="w-full max-w-[500px] shadow-3">
        <Toast ref={toast} position="top-center" />
        <div className="card flex justify-content-center">
          <InputText
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="שם אירוע"
          />
        </div>
        <br />
        <div className="card flex justify-content-center">
          <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder="בחר תאריך" />
        </div>
        <br />
        <div className="card flex justify-content-center">
          <Calendar
            value={time}
            onChange={(e) => setTime(e.value)}
            timeOnly
            hourFormat="24"
            placeholder="בחר שעה"
          />
        </div>
        <br />
        <div className="card flex justify-content-center">
          <InputTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={30}
            placeholder="תיאור האירוע"
          />
        </div>
        <br />
        <Button
          label="שמור"
          icon="pi pi-calendar-plus"
          className="w-full mt-4"
          onClick={handleSubmit}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default AddEvent;
