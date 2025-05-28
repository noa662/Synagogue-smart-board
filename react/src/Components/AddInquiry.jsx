import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { useAddInquiry } from "../Hooks/useAddInquiry";

const AddInquiry = () => {
  const user = useSelector((state) => state.user);
  const toast = useRef(null);

  const {
    subjectOfInquiry,
    setSubjectOfInquiry,
    description,
    setDescription,
    handleSubmit,
    loading
  } = useAddInquiry(toast, user);

  return (
    <div style={{ paddingTop: "10vh" }} className="flex justify-center px-4">
      <Card title="טופס שליחת פנייה" className="w-full max-w-[500px] shadow-3">
        <div className="card flex flex-column gap-3 max-w-md mx-auto mt-6" dir="rtl">
          <Toast ref={toast} position="top-center" />
          <div>
            <label htmlFor="subject" className="block mb-2">נושא הפנייה</label>
            <InputText
              id="subject"
              value={subjectOfInquiry}
              onChange={(e) => setSubjectOfInquiry(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2">תיאור</label>
            <InputTextarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full"
              autoResize
            />
          </div>

          <Button
            label="שלח פנייה"
            icon="pi pi-send"
            className="w-full mt-4"
            onClick={handleSubmit}
            loading={loading}
          />
        </div>
      </Card>
    </div>
  );
};

export default AddInquiry;