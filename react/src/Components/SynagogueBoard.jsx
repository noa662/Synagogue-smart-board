import { useNavigate } from "react-router-dom";
import { useCurrentDateTime } from "../Hooks/useCurrentDateTime";

const SynagogueBoard = () => {
  const { formattedDate, formattedTime } = useCurrentDateTime();
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen h-screen w-screen overflow-hidden bg-blue-50 p-6 text-center font-sans flex flex-col justify-center items-center"
    >
      <div className="text-center max-w-md w-full mx-auto">
        <h1>צג דיגיטלי לבית הכנסת</h1>
        <p>
          <span className="font-bold">
            {`תאריך: ${formattedDate} | שעה: ${formattedTime}`}
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