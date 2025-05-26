import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";

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

        console.log("user.username:", user?.username);

        if (!user || user.username === "?" || user.username === undefined) {
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

        const inquiry = {
            userName: user.username,
            date: new Date().toISOString(),
            subjectOfInquiry,
            description
        };

        try {
            await fetch("http://localhost:8080/inquiries", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(inquiry),
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
            toast.current.show({
                severity: 'error',
                summary: 'שגיאה',
                detail: err.response?.data?.message || 'שליחת הפנייה נכשלה',
                life: 4000
            });
        }
    };

    return (
        <Card title="טופס שליחת פנייה" className="w-full max-w-[500px] shadow-3">
            <div className="card flex flex-column gap-3 max-w-md mx-auto mt-6" dir="rtl">
                <Toast ref={toast} position="top-center" />

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
        </Card>
    );
};

export default AddInquiry;
