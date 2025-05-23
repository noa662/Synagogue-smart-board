import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

const TodaysTimes = () => {
    const [zmanim, setZmanim] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useRef(null);

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
                            setError(null);
                        } else {
                            const errMsg = "השרת לא החזיר נתונים בפורמט JSON";
                            setError(errMsg);
                            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: errMsg, life: 5000 });
                        }
                    } catch (err) {
                        const errMsg = "שגיאה בשליפת זמני היום";
                        setError(errMsg);
                        toast.current.show({ severity: 'error', summary: 'שגיאה', detail: errMsg, life: 5000 });
                    } finally {
                        setLoading(false);
                    }
                },
                () => {
                    const errMsg = "יש לאפשר גישה למיקום על מנת להציג זמני היום";
                    setError(errMsg);
                    toast.current.show({ severity: 'warn', summary: 'אזהרה', detail: errMsg, life: 5000 });
                    setLoading(false);
                }
            );
        } else {
            const errMsg = "הדפדפן לא תומך בזיהוי מיקום";
            setError(errMsg);
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: errMsg, life: 5000 });
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

    if (loading) return <p className="text-center mt-4 text-lg">טוען זמני היום...</p>;
    if (error && zmanim.length === 0) return <p className="text-center text-red-600 mt-4 text-lg">{error}</p>;

    return (
        <div className="card w-full max-w-3xl mx-auto p-6 shadow-lg" dir="rtl" style={{ marginTop: '15vh', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
            <Toast ref={toast} position="top-center" />
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-right">זמני היום</h2>
            <DataTable
                value={zmanim}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 20, 50]}
                tableStyle={{ width: '100%', direction: 'rtl' }}
                stripedRows
                className="shadow-sm rounded-lg"
                emptyMessage="אין זמני היום להצגה"
            >
                <Column
                    field="title"
                    header="זמן"
                    bodyClassName="text-right text-lg font-semibold text-gray-700"
                    headerClassName="text-right text-lg font-semibold"
                    style={{ minWidth: '60%' }}
                />
                <Column
                    field="time"
                    header="שעה"
                    bodyClassName="text-right text-lg text-blue-700"
                    headerClassName="text-right text-lg font-semibold"
                    style={{ minWidth: '40%' }}
                />
            </DataTable>
        </div>
    );
};

export default TodaysTimes;
