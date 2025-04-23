import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SynagogueBoard = () => {

  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // עדכון השעה כל שנייה
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };


  return (
    <div className="min-h-screen bg-blue-50 p-6 text-right font-sans">
      <h1 className="text-3xl font-bold text-center mb-2">צג דיגיטלי לבית הכנסת</h1>

      <p className="text-xl text-center text-gray-700 mb-6">
        <span className="font-bold">
          {`תאריך: ${formatDate(currentTime)} | שעה: ${formatTime(currentTime)}`}
        </span>
      </p>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-blue-600 px-6 py-2 rounded-full border border-blue-600 hover:bg-blue-100 transition"
        >
          מעבר לממשק מנהל
        </button>
      </div>

    </div>
  );
};

export default SynagogueBoard;

// {error ? (
//   <p className="text-center text-red-600 mt-4">{error}</p>
// ) : (
//   <PrayerTimesBoard prayerTimes={prayerTimes} />
// )}
