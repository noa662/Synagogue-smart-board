import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "primereact/card";

const TodaysTimes = () => {
    const [zmanim, setZmanim] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get('http://localhost:8080/times', {
                            params: { lat: latitude, lon: longitude }
                        });
                        const contentType = response.headers['content-type'];
                        if (contentType && contentType.includes('application/json')) {
                            setZmanim(response.data);
                            console.log("Zmanim from server:", response.data);
                        } else {
                            console.error("Expected JSON, but got something else:", response.data);
                            setError("השרת לא החזיר נתונים בפורמט JSON");
                        }
                    } catch (err) {
                        console.error("Axios error:", err.response || err);
                        setError("שגיאה בשליפת זמני היום");
                    } finally {
                        setLoading(false);
                    }
                },
                (geoError) => {
                    console.error("Geolocation error:", geoError);
                    setError("יש לאפשר גישה למיקום על מנת להציג זמני היום");
                    setLoading(false);
                }
            );
        } else {
            setError("הדפדפן לא תומך בזיהוי מיקום");
            setLoading(false);
        }
    }, []);

    const formatTime = (time) => {
        if (!time || typeof time !== 'string' || time.trim() === "") {
            return "תאריך לא תקין";
        }
        try {
            const date = new Date(time.trim());
    
            if (isNaN(date.getTime())) {
                console.warn("Invalid time format:", time);
                return "תאריך לא תקין";
            }
            return date.toLocaleTimeString('he-IL', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Jerusalem'
            });
        } catch (e) {
            console.error("Error parsing date:", e);
            return "שגיאה בפורמט שעה";
        }
    };    

    const zmanimTitles = {
        Alos72: "עלות השחר 72 דקות",
        AlosHashachar: "עלות השחר",
        BeginAstronomicalTwilight: "תחילת דמדומים אסטרונומיים",
        BeginCivilTwilight: "תחילת דמדומים אזרחיים",
        BeginNauticalTwilight: "תחילת דמדומים ימי",
        CandleLighting: "הדלקת נרות",
        Chatzos: "חצות",
        ChatzosAsHalfDay: "חצות (חצי יום)",
        EndAstronomicalTwilight: "סיום דמדומים אסטרונומיים",
        EndCivilTwilight: "סיום דמדומים אזרחיים",
        EndNauticalTwilight: "סיום דמדומים ימי",
        MinchaGedola: "מנחה גדולה",
        MinchaKetana: "מנחה קטנה",
        PlagHamincha: "פלג המנחה",
        SeaLevelSunrise: "זריחה על פני הים",
        SeaLevelSunset: "שקיעה על פני הים",
        ShaahZmanisGra: "שעה זמנית גר\"א",
        ShaahZmanisMGA: "שעה זמנית MGA",
        SofZmanShmaGRA: "סוף זמן שמע גר\"א",
        SofZmanShmaMGA: "סוף זמן שמע MGA",
        SofZmanTfilaGRA: "סוף זמן תפילה גר\"א",
        SofZmanTfilaMGA: "סוף זמן תפילה MGA",
        SolarMidnight: "חצות השמש",
        SunLowerTransit: "מעבר השמש נמוך",
        SunTransit: "מעבר השמש",
        Sunrise: "זריחה",
        Sunset: "שקיעה",
        TemporalHour: "שעה זמנית",
        Tzais: "צאת הכוכבים",
        Tzais72: "צאת הכוכבים 72 דקות"
    };     

    if (loading) return <p className="text-center mt-4">טוען זמני היום...</p>;
    if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(zmanim.BasicZmanim).map(([key, value]) => (
            //{Object.entries(zmanim).map(([key, value]) => (
                <div key={key}>
                    <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
                        <div className="p-4 text-center">
                            <p className="text-lg font-semibold">{zmanimTitles[key]}</p>
                            <p className="text-xl mt-2 text-blue-600">{formatTime(value)}</p>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default TodaysTimes;
