import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Toast } from 'primereact/toast';

const Events = () => {
    const [events, setEvents] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        try {
            const response = await axios.get("http://localhost:8080/events");
            console.log("התקבלו כל האירועים:", response.data);
            if (!response.data || response.data.length === 0) {
                toast.current.show({ severity: 'warn', summary: 'אין אירועים', detail: 'לא נמצאו אירועים לעתיד', life: 3000 });
                setEvents([]);
                return;
            }

            const filteredEvents = response.data.filter(event => new Date(event.date) >= new Date());
            if (filteredEvents.length === 0) {
                toast.current.show({ severity: 'info', summary: 'אין אירועים עתידיים', detail: 'אין אירועים קרובים', life: 3000 });
            }
            setEvents(filteredEvents);
        } catch (err) {
            console.log("בעיה בשליפת אירועים:", err);
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'בעיה בשליפת אירועים', life: 3000 });
        }
    }

    const dateBodyTemplate = (rowData) => {
        const date = new Date(rowData.date);
        return date.toLocaleDateString("he-IL"); // תאריך בעברית
    };

    return (
        <div className="card" dir="rtl">
            <Toast ref={toast} position="top-center" />
            <DataTable value={events} showGridlines tableStyle={{ minWidth: '50rem', direction: 'rtl' }}>
                <Column field="eventName" header="שם" style={{ textAlign: 'right' }} />
                <Column field="date" header="תאריך" body={dateBodyTemplate} style={{ textAlign: 'right' }} />
                <Column field="time" header="שעה" style={{ textAlign: 'right' }} />
            </DataTable>
        </div>
    );
};

export default Events;
