// import React, { useState } from "react";
// import { InputTextarea } from "primereact/inputtextarea";
// import { InputText } from "primereact/inputtext";
// import { Calendar } from 'primereact/calendar';
// import { Button } from "primereact/button";
// import axios from 'axios';

// const AddEvent = () => {

//     const [eventName, setEventName] = useState('');
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');
//     const [description, setDescription] = useState('')

//     const handleSubmit = async () => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             console.error("No token found");
//             return;
//         }

//         const event = {
//             eventName,
//             date: date ? date.toISOString() : null,
//             time: time ? time.toISOString() : null,
//             description,
//         };

//         console.log("אירוע:", event);

//         try {
//             await axios.post("http://localhost:8080/events", event,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     }
//                 })
//             console.log("נשמר בהצלחה")
//         } catch (err) {
//             console.error("שגיאה בהתחברות:", err);
//         }
//     };

//     return (
//         <>  
//         <div className="card flex justify-content-center">
//                         <InputText value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="שם אירוע" />
//                     </div>
//                     <br />
//                     <div className="card flex justify-content-center">
//                         <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder="בחר תאריך" />
//                     </div>
//                     <br />
//                      <Calendar 
//                     value={time} 
//                     onChange={(e) => setTime(e.value)} 
//                     timeOnly 
//                     hourFormat="24" // או "12"
//                      placeholder="בחר שעה"
//                   />  
//                     <br/> <br/>
//                     <div className="card flex justify-content-center">
//                     <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
//                     </div>      

//                     <Button
//                         label="שמור"
//                         icon="pi pi-user-plus"
//                         className="w-full mt-4"
//                         onClick={handleSubmit}
//                     /></>
//     );
// };

// export default AddEvent;

import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";
import axios from 'axios';

const AddEvent = () => {
    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [description, setDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setErrorMsg(''); // איפוס הודעות שגיאה

        const token = localStorage.getItem("token");
        if (!token) {
            setErrorMsg("אין הרשאה, יש להתחבר.");
            return;
        }

        if (!eventName || !date || !time) {
            setErrorMsg("אנא מלא/י שם אירוע, תאריך ושעה.");
            return;
        }

        const event = {
            eventName,
            date: date.toISOString(),
            time: time.toISOString(),
            description,
        };

        console.log("אירוע:", event);

        try {
            await axios.post("http://localhost:8080/events", event, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("נשמר בהצלחה");
            // אפשר לנקות שדות או להודיע למשתמש שהאירוע נשמר
        } catch (err) {
            console.error("שגיאה בהתחברות:", err);
            setErrorMsg("שגיאה בשמירת האירוע. אנא נסה/י שוב.");
        }
    };

    return (
        <>
            <div className="card flex justify-content-center">
                <InputText value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="שם אירוע" />
            </div>
            <br />
            <div className="card flex justify-content-center">
                <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder="בחר תאריך" />
            </div>
            <br />
            <Calendar
                value={time}
                onChange={(e) => setTime(e.value)}
                timeOnly
                hourFormat="24"
                placeholder="בחר שעה"
                className="custom-timepicker"
            />
            <br /><br />
            <div className="card flex justify-content-center">
                <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} placeholder="תיאור האירוע" />
            </div>
            <br />
            {errorMsg && <div style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</div>}
            <Button
                label="שמור"
                icon="pi pi-user-plus"
                className="w-full mt-4"
                onClick={handleSubmit}
            />
        </>
    );
};

export default AddEvent;
