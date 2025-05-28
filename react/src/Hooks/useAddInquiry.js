import { useState } from 'react';

export const useAddInquiry = (toastRef, user) => {
  const [subjectOfInquiry, setSubjectOfInquiry] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setSubjectOfInquiry('');
    setDescription('');
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'שגיאה',
        detail: 'לא נמצאה גישה. התחבר למערכת.',
        life: 3000
      });
      return;
    }

    if (!user || user.username === "?" || !user.email) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'שגיאה',
        detail: 'המשתמש או המייל אינם זמינים',
        life: 3000
      });
      return;
    }

    if (!subjectOfInquiry.trim() || !description.trim()) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'שדות חסרים',
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
      setLoading(true);
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

      toastRef.current?.show({
        severity: 'success',
        summary: 'הצלחה',
        detail: 'הפנייה התקבלה בהצלחה',
        life: 3000
      });

      resetForm();
    } catch (err) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'שגיאה',
        detail: err.message || 'שליחת הפנייה נכשלה',
        life: 4000
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    subjectOfInquiry,
    setSubjectOfInquiry,
    description,
    setDescription,
    handleSubmit,
    loading
  };
};
