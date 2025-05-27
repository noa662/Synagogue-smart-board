import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import axios from "axios";
import { fetchZmanim } from "../Services/zmanimService";

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
        Tzais72: "צאת הכוכבים 72 דקות",
    };

    useEffect(() => {
        const loadZmanim = () => {
            if (!navigator.geolocation) {
                const errMsg = "הדפדפן לא תומך בזיהוי מיקום";
                setError(errMsg);
                setLoading(false);
                if (toast.current) {
                    toast.current.show({
                        severity: "error",
                        summary: "שגיאה",
                        detail: errMsg,
                        life: 3000,
                    });
                }
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async ({ coords }) => {
                    try {
                        const basicZmanim = await fetchZmanim(coords.latitude, coords.longitude);
                        if (!basicZmanim) throw new Error("Invalid response format");

                        const formatted = Object.entries(basicZmanim)
                            .filter(
                                ([key, value]) =>
                                    zmanimTitles[key] &&
                                    typeof value === "string" &&
                                    value.includes("T")
                            )
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
                        if (toast.current) {
                            toast.current.show({
                                severity: "error",
                                summary: "שגיאה",
                                detail: errMsg,
                                life: 3000,
                            });
                        }
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error("שגיאה בקבלת מיקום:", error);
                    const errMsg = "יש לאפשר גישה למיקום על מנת להציג זמני היום";
                    setError(errMsg);
                    if (toast.current) {
                        toast.current.show({
                            severity: "warn",
                            summary: "אזהרה",
                            detail: errMsg,
                            life: 3000,
                        });
                    }
                    setLoading(false);
                }
            );
        };

        loadZmanim();
    }, []);

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

    if (loading)
        return (
            <p className="text-center text-gray-600 text-xl">טוען זמני היום...</p>
        );
    if (error) return <p className="text-center text-red-600 text-xl">{error}</p>;

    return (
        <div
            className="card p-4"
            dir="rtl"
            style={{ minWidth: "60rem", marginTop: "10vh" }}
        >
            <h1 className="text-4xl font-bold text-center mb-6">זמני היום</h1>
            <DataTable
                value={zmanim}
                paginator
                rows={6}
                rowsPerPageOptions={[6, 12, 24]}
                paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
                emptyMessage="אין זמני היום להצגה"
            >
                <Column
                    field="title"
                    header="זמן"
                    style={{ textAlign: "right", fontWeight: "bold", width: "50%" }}
                />
                <Column
                    field="time"
                    header="שעה"
                    style={{ textAlign: "center", fontWeight: "bold", width: "50%" }}
                />
            </DataTable>
            <Toast ref={toast} position="top-center" />
        </div>
    );
};

export default TodaysTimes;
