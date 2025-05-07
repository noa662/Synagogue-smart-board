import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        try {
            const response = await axios.get("http://localhost:8080/events");
            console.log("התקבלו כל האירועים:", response.data);
            const filteredEvents = response.data.filter(event => new Date(event.date) >= new Date());
            setEvents(filteredEvents);
        } catch (err) {
            console.log("בעיה בשליפת אירועים:", err);
        }
    }

    const dateBodyTemplate = (rowData) => {
        const date = new Date(rowData.date);
        return date.toLocaleDateString("he-IL") // תאריך בעברית
    };    

    return (
        
        <div className="card" dir='rtl'>
            <DataTable value={events} showGridlines tableStyle={{ minWidth: '50rem', direction: 'rtl'}}>
                <Column field="eventName" header="שם" style={{ textAlign: 'right' }}/>
                <Column field="date" header="תאריך" body={dateBodyTemplate} style={{ textAlign: 'right' }}/>
                <Column field="time" header="שעה" style={{ textAlign: 'right' }}/>
            </DataTable>
        </div>
    );
};

export default Events;