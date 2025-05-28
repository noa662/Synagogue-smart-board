import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { useZmanim } from "../Hooks/useZmanim";

const TodaysTimes = () => {
  const toast = useRef(null);
  const { zmanim, loading, error } = useZmanim(toast); 

  if (loading)
    return <p className="text-center text-gray-600 text-xl">טוען זמני היום...</p>;

  if (error)
    return <p className="text-center text-red-600 text-xl">{error}</p>;

  return (
    <div
      className="card p-4"
      dir="rtl"
      style={{ minWidth: "60rem", marginTop: "10vh" }}
    >
      <h1 className="text-4xl font-bold text-center mb-6">זמני היום</h1>
      <DataTable
        value={zmanim}
        paginator
        rows={6}
        rowsPerPageOptions={[6, 12, 24]}
        paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
        emptyMessage="אין זמני היום להצגה"
      >
        <Column
          field="title"
          header="זמן"
          style={{ textAlign: "right", fontWeight: "bold", width: "50%" }}
        />
        <Column
          field="time"
          header="שעה"
          style={{ textAlign: "center", fontWeight: "bold", width: "50%" }}
        />
      </DataTable>
      <Toast ref={toast} position="top-center" />
    </div>
  );
};

export default TodaysTimes;