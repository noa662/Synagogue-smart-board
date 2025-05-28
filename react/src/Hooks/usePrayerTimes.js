import { useEffect, useState, useRef } from "react";
import { getPrayerTimesByDate } from "../Services/prayerService";

export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  const today = new Date();

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const isoDate = today.toISOString().split("T")[0];
      console.log("Function called with date:", isoDate);
      try {
        const data = await getPrayerTimesByDate(isoDate);
        setPrayerTimes(data);
        setError(null);
      } catch (err) {
        console.error("שגיאה בטעינת זמני תפילה:", err);
        setError("שגיאה בטעינת זמני תפילה");
        toast.current?.show({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן לטעון זמני תפילה',
          life: 4000
        });
      }
    };

    fetchPrayerTimes();
    const interval = setInterval(fetchPrayerTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  return { prayerTimes, error, today, toast };
};