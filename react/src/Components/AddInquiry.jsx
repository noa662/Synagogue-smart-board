import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const AddInquiry = () => {
    const [subjectOfInquiry, setSubjectOfInquiry] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const toast = useRef(null);

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            console.log("המשתמש מהstate:", user);
        }
    }, [user]);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            toast.current.show({
                severity: 'warn',
                summary: 'שגיאה',
                detail: 'לא נמצאה גישה. התחבר למערכת.',
                life: 3000
            });
            return;
        }

        console.log("user.userName:", user.userName);
        const inquiry = {
            userName: user.username,
            date: new Date().toISOString(),
            subjectOfInquiry,
            description
        };

        if (!user || user.userName === "?") {
            console.log("המשתמש לא מחובר למערכת");
            toast.current.show({
                severity: 'warn',
                summary: 'שגיאה',
                detail: 'המשתמש לא מחובר למערכת',
                life: 3000
            });
            return;
        }

        if (!subjectOfInquiry.trim() || !description.trim()) {
            toast.current.show({
                severity: 'warn',
                summary: 'שגיאה',
                detail: 'אנא מלא את כל השדות',
                life: 3000
            });
            return;
        }

        try {
            await axios.post("http://localhost:8080/inquiries", inquiry, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("inquiry being sent:", inquiry);
            console.log("נשמר בהצלחה");

            toast.current.show({
                severity: 'success',
                summary: 'הצלחה',
                detail: 'הפנייה התקבלה בהצלחה',
                life: 3000
            });

            setSubjectOfInquiry('');
            setDescription('');
        } catch (err) {
            console.error("שגיאה בשליחת הפנייה:", err);
            console.error("שגיאה מלאה:", err.response);
            toast.current.show({
                severity: 'error',
                summary: 'שגיאה',
                detail: err.response?.data?.message || 'שליחת הפנייה נכשלה',
                life: 4000
            });
        }
    };

    return (
        <div className="card flex flex-column gap-3 max-w-md mx-auto mt-6" dir="rtl">
            <Toast ref={toast} position="top-center" />
            <h2 className="text-xl font-bold text-center">שליחת פנייה</h2>

            <div>
                <label htmlFor="subject" className="block mb-2">נושא הפנייה</label>
                <InputText
                    id="subject"
                    value={subjectOfInquiry}
                    onChange={(e) => setSubjectOfInquiry(e.target.value)}
                    className="w-full"
                />
            </div>

            <div>
                <label htmlFor="description" className="block mb-2">תיאור</label>
                <InputTextarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full"
                    autoResize
                />
            </div>

            <Button
                label="שלח פנייה"
                icon="pi pi-send"
                className="w-full mt-4"
                onClick={handleSubmit}
            />
        </div>
    );
};

export default AddInquiry;
