import { useEffect, useState } from "react";
import { fetchZmanim } from "../Services/zmanimService";

const zmanimTitles = {
  Alos72: "עלות השחר 72 דקות",
  AlosHashachar: "עלות השחר",
  CandleLighting: "הדלקת נרות",
  Chatzos: "חצות",
  ChatzosAsHalfDay: "חצות (חצי יום)",
  MinchaGedola: "מנחה גדולה",
  MinchaKetana: "מנחה קטנה",
  PlagHamincha: "פלג המנחה",
  SeaLevelSunrise: "זריחה על פני הים",
  SeaLevelSunset: "שקיעה על פני הים",
  ShaahZmanisGra: "שעה זמנית גר\"א",
  ShaahZmanisMGA: "שעה זמנית מג\"א",
  SofZmanShmaGRA: "סוף זמן שמע גר\"א",
  SofZmanShmaMGA: "סוף זמן שמע מג\"א",
  SofZmanTfilaGRA: "סוף זמן תפילה גר\"א",
  SofZmanTfilaMGA: "סוף זמן תפילה מג\"א",
  SolarMidnight: "חצות השמש",
  Sunrise: "זריחה",
  Sunset: "שקיעה",
  TemporalHour: "שעה זמנית",
  Tzais: "צאת הכוכבים",
  Tzais72: "צאת הכוכבים 72 דקות",
};

const formatTime = (time) => {
  if (!time || typeof time !== "string" || time.trim() === "") {
    return "תאריך לא תקין";
  }
  try {
    const date = new Date(time.trim());
    if (isNaN(date.getTime())) return "תאריך לא תקין";
    return date.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jerusalem",
    });
  } catch {
    return "שגיאה בפורמט שעה";
  }
};

export const useZmanim = (toastRef) => {
  const [zmanim, setZmanim] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadZmanim = () => {
      if (!navigator.geolocation) {
        const errMsg = "הדפדפן לא תומך בזיהוי מיקום";
        setError(errMsg);
        toastRef?.current?.show({
          severity: "error",
          summary: "שגיאה",
          detail: errMsg,
          life: 3000,
        });
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const basicZmanim = await fetchZmanim(coords.latitude, coords.longitude);
            if (!basicZmanim) throw new Error("Invalid response format");

            const formatted = Object.entries(basicZmanim)
              .filter(([key, value]) => zmanimTitles[key] && typeof value === "string" && value.includes("T"))
              .map(([key, value]) => ({
                key,
                title: zmanimTitles[key],
                time: formatTime(value),
              }));

            setZmanim(formatted);
            setError(null);
          } catch (err) {
            console.error("בעיה בשליפת זמני היום:", err);
            const errMsg = "בעיה בשליפת זמני היום";
            setError(errMsg);
            toastRef?.current?.show({
              severity: "error",
              summary: "שגיאה",
              detail: errMsg,
              life: 3000,
            });
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("שגיאה בקבלת מיקום:", error);
          const errMsg = "יש לאפשר גישה למיקום על מנת להציג זמני היום";
          setError(errMsg);
          toastRef?.current?.show({
            severity: "warn",
            summary: "אזהרה",
            detail: errMsg,
            life: 3000,
          });
          setLoading(false);
        }
      );
    };

    loadZmanim();
  }, [toastRef]);

  return { zmanim, loading, error };
};
