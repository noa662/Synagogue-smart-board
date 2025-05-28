import { useState, useEffect } from "react";
import { fetchInquiries, deleteInquiryById } from "../Services/inquiryService";

export const useInquiries = (toastRef) => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const data = await fetchInquiries();
      setInquiries(data);
    } catch (error) {
      console.error("בעיה בשליפת פניות:", error);
      toastRef?.current?.show({
        severity: 'error',
        summary: 'שגיאה',
        detail: 'בעיה בשליפת פניות',
        life: 3000,
      });
    }
  };

  const confirmDelete = (inquiry) => {
    setSelectedInquiry(inquiry);
    setDeleteDialogVisible(true);
  };

  const deleteInquiry = async () => {
    try {
      await deleteInquiryById(selectedInquiry._id);
      setInquiries((prev) => prev.filter((inq) => inq._id !== selectedInquiry._id));
      toastRef?.current?.show({
        severity: 'success',
        summary: 'נמחק בהצלחה',
        detail: 'הפנייה נמחקה',
        life: 3000,
      });
    } catch (error) {
      console.error("שגיאה במחיקת פנייה:", error);
      toastRef?.current?.show({
        severity: 'error',
        summary: 'שגיאה',
        detail: 'מחיקה נכשלה',
        life: 3000,
      });
    } finally {
      setDeleteDialogVisible(false);
      setSelectedInquiry(null);
    }
  };

  return {
    inquiries,
    selectedInquiry,
    deleteDialogVisible,
    confirmDelete,
    deleteInquiry,
    setDeleteDialogVisible,
  };
};