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
            toast.current.show({
                severity: 'warn',
                summary: 'שגיאה',
                detail: 'לא נמצאה גישה. התחבר למערכת.',
                life: 3000
            });
            return;
        }

        if (!user || user.username === "?" || !user.email) {
            toast.current.show({
                severity: 'warn',
                summary: 'שגיאה',
                detail: 'המשתמש או המייל אינם זמינים',
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
            userEmail: user.email,
            date: new Date().toISOString(),
            subjectOfInquiry,
            description
        };

        try {
            const res = await fetch("http://localhost:8080/inquiries", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(inquiry),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'שגיאה בשמירת הפנייה');
            }

            toast.current.show({
                severity: 'success',
                summary: 'הצלחה',
                detail: 'הפנייה התקבלה בהצלחה',
                life: 3000
            });

            setSubjectOfInquiry('');
            setDescription('');
        } catch (err) {
            toast.current.show({
                severity: 'error',
                summary: 'שגיאה',
                detail: err.message || 'שליחת הפנייה נכשלה',
                life: 4000
            });
        }
    };

    return (
        <div style={{ paddingTop: "10vh" }} className="flex justify-center px-4">
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
        </div>
    );
};

export default AddInquiry;