import React, { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useUpcomingEvents } from "../Hooks/useUpcomingEvents";

const Events = () => {
  const toast = useRef(null);
  const events = useUpcomingEvents(toast);

  const dateBodyTemplate = (rowData) => {
    const date = new Date(rowData.date);
    return date.toLocaleDateString("he-IL", {
      timeZone: 'Asia/Jerusalem',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const timeBodyTemplate = (rowData) => {
    const time = new Date(rowData.time);
    return time.toLocaleTimeString("he-IL", {
      timeZone: 'Asia/Jerusalem',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div
      className="p-4"
      dir="rtl"
      style={{ minHeight: 'calc(100vh - 100px)', marginTop: '10vh', textAlign: 'center' }}
    >
      <Toast ref={toast} position="top-center" />
      <h1>רשימת אירועים קרובים</h1>

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
        <Column field="time" header="שעה" body={timeBodyTemplate} style={{ textAlign: 'right' }} />
      </DataTable>
    </div>
  );
};

export default Events;
