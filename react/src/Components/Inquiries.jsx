import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useInquiries } from "../Hooks/useInquiries";

const Inquiries = () => {
  const toast = useRef(null);

  const {
    inquiries,
    selectedInquiry,
    deleteDialogVisible,
    confirmDelete,
    deleteInquiry,
    setDeleteDialogVisible,
  } = useInquiries(toast);

  const actionTemplate = (rowData) => (
    <Button
      className="custom-button"
      icon="pi pi-trash"
      severity="danger"
      rounded
      outlined
      onClick={() => confirmDelete(rowData)}
    />
  );

  const dateTemplate = (rowData) => {
    return new Date(rowData.date).toLocaleString("he-IL");
  };

  const deleteDialogFooter = (
    <>
      <Button
        className="custom-button"
        label="לא"
        icon="pi pi-times"
        onClick={() => setDeleteDialogVisible(false)}
        outlined
      />
      <Button
        className="custom-button"
        label="כן"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteInquiry}
      />
    </>
  );

  return (
    <div
      className="card"
      style={{ paddingTop: "10vh", textAlign: "center" }}
    >
      <Toast ref={toast} position="top-center" />
      <h3>פניות שהתקבלו</h3>
      <DataTable
        className="custom-table"
        value={inquiries}
        paginator
        rows={10}
        responsiveLayout="scroll"
      >
        <Column field="userName" header="שם משתמש" sortable style={{ minWidth: "10rem" }} />
        <Column field="date" header="תאריך" body={dateTemplate} sortable style={{ minWidth: "10rem" }} />
        <Column field="subjectOfInquiry" header="נושא" style={{ minWidth: "10rem" }} />
        <Column field="description" header="תיאור" style={{ minWidth: "15rem" }} />
        <Column body={actionTemplate} header="פעולות" style={{ minWidth: "8rem" }} />
      </DataTable>

      <Dialog
        visible={deleteDialogVisible}
        header="אישור מחיקה"
        modal
        onHide={() => setDeleteDialogVisible(false)}
        footer={deleteDialogFooter}
      >
        <p>
          האם אתה בטוח שברצונך למחוק את הפנייה של{" "}
          <strong>{selectedInquiry?.userName}</strong>?
        </p>
      </Dialog>
    </div>
  );
};

export default Inquiries;
