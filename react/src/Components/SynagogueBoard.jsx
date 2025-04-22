// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import PrayerTimesBoard from "./PrayerTimesBoard";

// const SynagogueBoard = () => {
//   const [prayerTimes, setPrayerTimes] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPrayerTimes = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/prayer-times/67eacba13f3e4ef2a2aebd26");
//         setPrayerTimes(response.data);
//       } catch (err) {
//         console.error("Failed to fetch prayer times", err);
//         setError("שגיאה בשליפת זמני תפילה");
//       }
//     };

//     fetchPrayerTimes();
//     const interval = setInterval(fetchPrayerTimes, 60000); // עדכון כל דקה
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold text-center mb-4">צג דיגיטלי לבית הכנסת</h1>
//       {error ? (
//         <p className="text-red-600 text-center">{error}</p>
//       ) : (
//         <PrayerTimesBoard prayerTimes={prayerTimes} />
//       )}
//       <div className="text-center mt-4">
//         <button
//           onClick={() => navigate("/admin")}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           מנהל
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SynagogueBoard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrayerTimesBoard from "./PrayerTimesBoard";

const SynagogueBoard = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/prayer-times/67eacba13f3e4ef2a2aebd26");
        setPrayerTimes(response.data);
      } catch (err) {
        console.error("שגיאה בטעינת זמני תפילה:", err);
        setError("שגיאה בטעינת זמני תפילה");
      }
    };

    fetchPrayerTimes();
    const interval = setInterval(fetchPrayerTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1>צג דיגיטלי לבית הכנסת</h1>

      {error ? (
        <p className="text-center text-red-600 mt-4">{error}</p>
      ) : (
        <PrayerTimesBoard prayerTimes={prayerTimes} />
      )}

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/admin")}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          מעבר לממשק מנהל
        </button>
      </div>
    </div>
  );
};

export default SynagogueBoard;
