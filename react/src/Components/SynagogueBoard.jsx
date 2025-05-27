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
    <div
      dir="rtl"
      className="min-h-screen h-screen w-screen overflow-hidden bg-blue-50 p-6 text-center font-sans flex flex-col justify-center items-center"
    >
        <div className="text-center max-w-md w-full mx-auto">
          <h1>צג דיגיטלי לבית הכנסת</h1>
          <p>
            <span className="font-bold">
              {`תאריך: ${formatDate(currentTime)} | שעה: ${formatTime(currentTime)}`}
            </span>
          </p>
          <button
            onClick={() => navigate("/login")}
            className="main-button shadow-lg"
          >
            מעבר לממשק מנהל
          </button>
      </div>
    </div>
  );
};

export default SynagogueBoard;
