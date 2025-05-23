// import { useEffect, useState } from 'react';
// import { InputText } from "primereact/inputtext";
// import { Calendar } from 'primereact/calendar';
// import { Button } from "primereact/button";
// import axios from 'axios';
// import { Card } from "primereact/card";

// const UpdateTimes = () => {
//     const [shacharit, setShacharit] = useState('');
//     const [mincha, setMincha] = useState('');
//     const [maariv, setMaariv] = useState('');
//     const [date, setDate] = useState(null);
//     const [location, setLocation] = useState(''); // location now string

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(
//             (pos) => {
//                 const locString = `${pos.coords.latitude},${pos.coords.longitude}`;
//                 setLocation(locString);
//             },
//             (err) => {
//                 console.error("Location error", err);
//             }
//         );
//     }, []);

//     const handleSubmit = async () => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             console.error("No token found");
//             return;
//         }

//         const prayerTime = {
//             date: date ? date.toISOString() : null,
//             shacharit,
//             mincha,
//             maariv,
//             location // string here
//         };

//         console.log("תפילה:", prayerTime);

//         try {
//             await axios.post("http://localhost:8080/prayer-times", prayerTime,
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
//         <Card title="הוספת זמני תפילה" className="w-full max-w-[500px] shadow-3">
//             <div className="card flex justify-content-center">
//                 <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder="בחר תאריך" />
//             </div>
//             <br />
//             <div className="card flex justify-content-center">
//                 <InputText value={shacharit} onChange={(e) => setShacharit(e.target.value)} placeholder="שחרית" />
//             </div>
//             <br />
//             <div className="card flex justify-content-center">
//                 <InputText value={mincha} onChange={(e) => setMincha(e.target.value)} placeholder="מנחה" />
//             </div>
//             <br />
//             <div className="card flex justify-content-center">
//                 <InputText value={maariv} onChange={(e) => setMaariv(e.target.value)} placeholder="ערבית" />
//             </div>
//             <br />
//             <Button
//                 label="שמור"
//                 icon="pi pi-user-plus"
//                 className="w-full mt-4"
//                 onClick={handleSubmit}
//             />
//         </Card>
//     );
// }

// export default UpdateTimes;

import { useEffect, useState, useRef } from 'react';
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";
import axios from 'axios';
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';

const UpdateTimes = () => {
    const [shacharit, setShacharit] = useState('');
    const [mincha, setMincha] = useState('');
    const [maariv, setMaariv] = useState('');
    const [date, setDate] = useState(null);
    const [location, setLocation] = useState('');
    const toast = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const locString = `${pos.coords.latitude},${pos.coords.longitude}`;
                setLocation(locString);
            },
            (err) => {
                console.error("Location error", err);
                toast.current.show({ severity: 'warn', summary: 'אזהרה', detail: 'לא הצלחנו לקבל את מיקום המשתמש', life: 3000 });
            }
        );
    }, []);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'אין הרשאה. אנא התחבר מחדש.', life: 3000 });
            return;
        }

        if (!date || !shacharit || !mincha || !maariv) {
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'יש למלא את כל השדות', life: 3000 });
            return;
        }

        const prayerTime = {
            date: date.toISOString(),
            shacharit,
            mincha,
            maariv,
            location
        };

        try {
            await axios.post("http://localhost:8080/prayer-times", prayerTime, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'הזמנים נשמרו בהצלחה', life: 3000 });

            // ניקוי השדות אחרי שמירה
            setDate(null);
            setShacharit('');
            setMincha('');
            setMaariv('');
        } catch (err) {
            console.error("שגיאה בהתחברות:", err);
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'שגיאה בשמירת הזמנים', life: 3000 });
        }
    };

    return (
        <Card title="הוספת זמני תפילה" className="w-full max-w-[500px] shadow-3">
            <Toast ref={toast} position="top-center" />
            <div className="card flex justify-content-center">
                <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder="בחר תאריך" />
            </div>
            <br />
            <div className="card flex justify-content-center">
                <InputText value={shacharit} onChange={(e) => setShacharit(e.target.value)} placeholder="שחרית" />
            </div>
            <br />
            <div className="card flex justify-content-center">
                <InputText value={mincha} onChange={(e) => setMincha(e.target.value)} placeholder="מנחה" />
            </div>
            <br />
            <div className="card flex justify-content-center">
                <InputText value={maariv} onChange={(e) => setMaariv(e.target.value)} placeholder="ערבית" />
            </div>
            <br />
            <Button
                label="שמור"
                icon="pi pi-user-plus"
                className="w-full mt-4"
                onClick={handleSubmit}
            />
        </Card>
    );
}

export default UpdateTimes;
