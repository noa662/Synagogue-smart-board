import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TodaysTimes = () => {
    const [zmanim, setZmanim] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        Tzais72: "צאת הכוכבים 72 דקות"
    };

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
                            const basicZmanim = response.data.BasicZmanim;
                            const formatted = Object.entries(basicZmanim)
                                .filter(([key, value]) =>
                                    zmanimTitles[key] &&
                                    typeof value === 'string' &&
                                    value.includes('T')
                                )
                                .map(([key, value]) => ({
                                    key,
                                    title: zmanimTitles[key],
                                    time: formatTime(value)
                                }));

                            setZmanim(formatted);
                        } else {
                            setError("השרת לא החזיר נתונים בפורמט JSON");
                        }
                    } catch (err) {
                        setError("שגיאה בשליפת זמני היום");
                    } finally {
                        setLoading(false);
                    }
                },
                () => {
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
            if (isNaN(date.getTime())) return "תאריך לא תקין";
            return date.toLocaleTimeString('he-IL', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Jerusalem'
            });
        } catch {
            return "שגיאה בפורמט שעה";
        }
    };

    if (loading) return <p className="text-center mt-4">טוען זמני היום...</p>;
    if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

    return (
        <div className="card w-full" dir="rtl" style={{ marginTop: '20vh', zIndex:'0' }}>
            <DataTable
                value={zmanim}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 20, 50]}
                tableStyle={{ width: '100%' }}
                stripedRows
                style={{ direction: 'rtl' }}
            >
                <Column field="title" header="זמן" bodyClassName="text-right" headerClassName="text-right" />
                <Column field="time" header="שעה" bodyClassName="text-right" headerClassName="text-right" />
            </DataTable>
        </div>
    );
};

export default TodaysTimes;
