import { useEffect, useState } from "react";
import { getEvents } from "../Services/eventService";

export const useUpcomingEvents = (toastRef) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      if (!data || data.length === 0) {
        toastRef?.current?.show({
          severity: 'warn',
          summary: 'אין אירועים',
          detail: 'לא נמצאו אירועים לעתיד',
          life: 3000,
        });
        setEvents([]);
        return;
      }

      const upcoming = data.filter(e => new Date(e.date) >= new Date());
      if (upcoming.length === 0) {
        toastRef?.current?.show({
          severity: 'info',
          summary: 'אין אירועים עתידיים',
          detail: 'אין אירועים קרובים',
          life: 3000,
        });
      }

      setEvents(upcoming);
    } catch (err) {
      toastRef?.current?.show({
        severity: 'error',
        summary: 'שגיאה',
        detail: 'בעיה בשליפת האירועים',
        life: 3000,
      });
    }
  };

  return events;
};
