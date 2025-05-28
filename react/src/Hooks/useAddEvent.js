import { useState } from "react";
import { addEvent } from "../Services/eventService";

export const useAddEvent = (toastRef) => {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEventName("");
    setDate(null);
    setTime(null);
    setDescription("");
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toastRef?.current?.show({
        severity: "error",
        summary: "שגיאה",
        detail: "אין הרשאה, יש להתחבר.",
        life: 3000,
      });
      return;
    }

    if (!eventName || !date || !time) {
      toastRef?.current?.show({
        severity: "warn",
        summary: "שדות חסרים",
        detail: "אנא מלא/י שם אירוע, תאריך ושעה.",
        life: 3000,
      });
      return;
    }

    const event = {
      eventName,
      date: date.toISOString(),
      time: time.toISOString(),
      description,
    };

    try {
      setLoading(true);
      await addEvent(event, token);
      toastRef?.current?.show({
        severity: "success",
        summary: "נשמר",
        detail: "האירוע נשמר בהצלחה",
        life: 3000,
      });
      resetForm();
    } catch (err) {
      console.error("שגיאה בשמירת האירוע:", err);
      toastRef?.current?.show({
        severity: "error",
        summary: "שגיאה",
        detail: "שגיאה בשמירת האירוע. נסה/י שוב.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};