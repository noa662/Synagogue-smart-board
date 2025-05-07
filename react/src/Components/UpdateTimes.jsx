import { useEffect, useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";
import axios from 'axios';

const UpdateTimes = () => {
    const [shacharit, setShacharit] = useState('');
    const [mincha, setmincha] = useState('');
    const [maariv, setmaariv] = useState('');
    const [date, setDate] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            (err) => {
                console.error("Location error", err);
            }
        );
    }, []);

    const handleSubmit = async () => {

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
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
            await axios.post("http://localhost:8080/prayer-times/", prayerTime,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            console.log("נשמר בהצלחה")
        } catch (err) {
            console.error("שגיאה בהתחברות:", err);
        }
    };

    return (
        <>
            <div className="card flex justify-content-center">
                <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder="בחר תאריך" />
            </div>
            <br />
            <div className="card flex justify-content-center">
                <InputText value={shacharit} onChange={(e) => setShacharit(e.target.value)} placeholder="שחרית" />
            </div>
            <br />
            <div className="card flex justify-content-center">
                <InputText value={mincha} onChange={(e) => setmincha(e.target.value)} placeholder="מנחה" />
            </div>
            <br />
            <div className="card flex justify-content-center">
                <InputText value={maariv} onChange={(e) => setmaariv(e.target.value)} placeholder="ערבית" />
            </div>
            <br />
            <Button
                label="שמור"
                icon="pi pi-user-plus"
                className="w-full mt-4"
                onClick={handleSubmit}
            />
        </>
    );
}

export default UpdateTimes;