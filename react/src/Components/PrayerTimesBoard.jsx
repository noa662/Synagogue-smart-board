import { Card } from 'primereact/card';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Toast } from 'primereact/toast';
import { getPrayerTimesByDate } from "../Services/prayerService";


const PrayerTimesBoard = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const data = await getPrayerTimesByDate(today);
        setPrayerTimes(data);
        setError(null);
      } catch (err) {
        console.error("שגיאה בטעינת זמני תפילה:", err);
        setError("שגיאה בטעינת זמני תפילה");
        toast.current.show({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן לטעון זמני תפילה',
          life: 4000
        });
      }
    };

    fetchPrayerTimes();
    const interval = setInterval(fetchPrayerTimes, 60000);
    return () => clearInterval(interval);
  }, []);


  if (!prayerTimes && !error) {
    return <p className="text-center text-gray-600 text-xl">טוען זמני תפילה...</p>;
  }

  return (
    <div
      className="max-w-md mx-auto mt-6"
      dir="rtl"
      style={{ paddingTop: "10vh" }}
    >
      <Toast ref={toast} position="top-center" />
      <Card title={<span className="text-3xl font-bold">זמני תפילה</span>} className="shadow-2xl border-round-xl p-6">
        {error ? (
          <p className="text-red-600 text-xl">{error}</p>
        ) : (
          <ul className="list-none p-0 m-0 space-y-4 text-2xl text-gray-900 leading-relaxed">
            <li><strong className="text-3xl">שחרית:</strong> <span className="text-3xl text-blue-700">{prayerTimes.shacharit}</span></li>
            <li><strong className="text-3xl">מנחה:</strong> <span className="text-3xl text-green-700">{prayerTimes.mincha}</span></li>
            <li><strong className="text-3xl">ערבית:</strong> <span className="text-3xl text-purple-700">{prayerTimes.maariv}</span></li>
          </ul>
        )}
      </Card>
    </div>
  );
};

export default PrayerTimesBoard;
