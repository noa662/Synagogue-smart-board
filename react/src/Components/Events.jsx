import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { getEvents } from "../Services/eventService";

const Events = () => {
  const [events, setEvents] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      if (!data || data.length === 0) {
        toast.current.show({
          severity: 'warn',
          summary: 'אין אירועים',
          detail: 'לא נמצאו אירועים לעתיד',
          life: 3000,
        });
        setEvents([]);
        return;
      }

      const upcomingEvents = data.filter(e => new Date(e.date) >= new Date());
      if (upcomingEvents.length === 0) {
        toast.current.show({
          severity: 'info',
          summary: 'אין אירועים עתידיים',
          detail: 'אין אירועים קרובים',
          life: 3000,
        });
      }

      setEvents(upcomingEvents);
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'שגיאה',
        detail: 'בעיה בשליפת האירועים',
        life: 3000,
      });
    }
  };

  const dateBodyTemplate = (rowData) => {
    const date = new Date(rowData.date);
    return date.toLocaleDateString("he-IL");
  };

  return (
    <div
      className="p-4"
      dir="rtl"
      style={{ minHeight: 'calc(100vh - 100px)', marginTop: '10vh', textAlign: 'center' }}
    >
      <Toast ref={toast} position="top-center" />
      <h2>רשימת אירועים קרובים</h2>

      <DataTable
        value={events}
        showGridlines
        responsiveLayout="scroll"
        className="p-datatable-striped"
        emptyMessage="אין אירועים להצגה"
        tableStyle={{ minWidth: '50rem', direction: 'rtl' }}
      >
        <Column field="eventName" header="שם האירוע" style={{ textAlign: 'right' }} />
        <Column field="date" header="תאריך" body={dateBodyTemplate} style={{ textAlign: 'right' }} />
        <Column field="time" header="שעה" style={{ textAlign: 'right' }} />
      </DataTable>
    </div>
  );
};

export default Events;
