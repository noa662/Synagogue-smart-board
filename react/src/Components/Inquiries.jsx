// import axios from "axios";
// import { useEffect, useState } from "react";

// const Inquiries = () => {

//     const [inquiries, setInquiries] = useState([]);

//     const fetchInquiries = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/inquiries");
//             setInquiries(response.data);
//         } catch (error) {
//             console.error("בעיה בשליפת פניות:", error);
//         }
//     };

//     useEffect(() => {
//         fetchInquiries();
//     }, []);


//     return (
//         <div>
//         </div>
//     );
// };

// export default Inquiries;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await axios.get("http://localhost:8080/inquiries");
            setInquiries(response.data);
        } catch (error) {
            console.error("בעיה בשליפת פניות:", error);
        }
    };

    const confirmDelete = (inquiry) => {
        setSelectedInquiry(inquiry);
        setDeleteDialogVisible(true);
    };

    const deleteInquiry = async () => {
        try {
            await axios.delete(`http://localhost:8080/inquiries/${selectedInquiry._id}`);
            setInquiries(inquiries.filter((inq) => inq._id !== selectedInquiry._id));
            toast.current.show({ severity: 'success', summary: 'נמחק בהצלחה', detail: 'הפנייה נמחקה', life: 3000 });
        } catch (error) {
            console.error("שגיאה במחיקת פנייה:", error);
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'מחיקה נכשלה', life: 3000 });
        } finally {
            setDeleteDialogVisible(false);
            setSelectedInquiry(null);
        }
    };

    const deleteDialogFooter = (
        <>
            <Button label="לא" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} outlined />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteInquiry} />
        </>
    );

    const actionTemplate = (rowData) => {
        return (
            <Button icon="pi pi-trash" severity="danger" rounded outlined onClick={() => confirmDelete(rowData)} />
        );
    };

    const dateTemplate = (rowData) => {
        return new Date(rowData.date).toLocaleString('he-IL');
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <h3>פניות שהתקבלו</h3>
            <DataTable
                className="custom-table"
                value={inquiries}
                paginator
                rows={10}
                responsiveLayout="scroll"
            >
                <Column field="userName" header="שם משתמש" sortable style={{ minWidth: '10rem' }} />
                <Column field="date" header="תאריך" body={dateTemplate} sortable style={{ minWidth: '10rem' }} />
                <Column field="subjectOfInquiry" header="נושא" style={{ minWidth: '10rem' }} />
                <Column field="description" header="תיאור" style={{ minWidth: '15rem' }} />
                <Column body={actionTemplate} header="פעולות" style={{ minWidth: '8rem' }} />
            </DataTable>

            <Dialog visible={deleteDialogVisible} header="אישור מחיקה" modal onHide={() => setDeleteDialogVisible(false)} footer={deleteDialogFooter}>
                <p>האם אתה בטוח שברצונך למחוק את הפנייה של <strong>{selectedInquiry?.userName}</strong>?</p>
            </Dialog>
        </div>
    );
};

export default Inquiries;