// import { useState, useDispatch, useSelector, useEffect } from 'react';
// import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Button } from "primereact/button";
// import axios from 'axios';

// const AddInquiry = () => {
//     const [subjectOfInquiry, setSubjectOfInquiry] = useState('');
//     const [description, setDescription] = useState('');
//     const [date, setDate] = useState(null);
//     const [userName, setUserName] = useState('');

//     const dispatch = useDispatch();

//     const user = useSelector((state) => state.user);
//     useEffect(() => {
//         if (user) {
//             console.log("המשתמש מהstate:", user);
//         }
//     }, [user]);

//     const handleSubmit = async () => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             console.error("No token found");
//             return;
//         }

//         const inquiry = {
//             subjectOfInquiry,
//             description,
//             date: Date.now(),
//             userName: user.userName
//         };

//         if (inquiry.userName !== "?") {
//             try {
//                 await axios.post("http://localhost:8080/inquiries", inquiry, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     }
//                 });
//                 console.log("נשמר בהצלחה");
//                 // ניקוי הטופס אחרי שליחה
//                 setSubjectOfInquiry('');
//                 setDescription('');
//             } catch (err) {
//                 console.error("שגיאה בשליחת הפנייה:", err);
//             }
//         }
//         else {
//             console.log("המשתמש לא מחובר למערכת");
//         }
//     };

//     return (
//         <div className="card flex flex-column gap-3 max-w-md mx-auto mt-6" dir="rtl">
//             <h2 className="text-xl font-bold text-center">שליחת פנייה</h2>
//             {/* נושא הפנייה */}
//             <div>
//                 <label htmlFor="subject" className="block mb-2">נושא הפנייה</label>
//                 <InputText
//                     id="subject"
//                     value={subjectOfInquiry}
//                     onChange={(e) => setSubjectOfInquiry(e.target.value)}
//                     className="w-full"
//                 />
//             </div>
//             {/* תיאור הפנייה */}
//             <div>
//                 <label htmlFor="description" className="block mb-2">תיאור</label>
//                 <InputTextarea
//                     id="description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     rows={5}
//                     className="w-full"
//                     autoResize
//                 />
//             </div>
//             {/* כפתור שליחה */}
//             <Button
//                 label="שלח פנייה"
//                 icon="pi pi-send"
//                 className="w-full mt-4"
//                 onClick={handleSubmit}
//             />
//         </div>
//     );
// };

// export default AddInquiry;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from 'axios';

const AddInquiry = () => {
    const [subjectOfInquiry, setSubjectOfInquiry] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            console.log("המשתמש מהstate:", user);
        }
    }, [user]);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }

        const inquiry = {
            subjectOfInquiry,
            description,
            date: Date.now(),
            userName: user.userName
        };

        if (inquiry.userName !== "?") {
            try {
                await axios.post("http://localhost:8080/inquiries", inquiry, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log("נשמר בהצלחה");
                setSubjectOfInquiry('');
                setDescription('');
            } catch (err) {
                console.error("שגיאה בשליחת הפנייה:", err);
            }
        } else {
            console.log("המשתמש לא מחובר למערכת");
        }
    };

    return (
        <div className="card flex flex-column gap-3 max-w-md mx-auto mt-6" dir="rtl">
            <h2 className="text-xl font-bold text-center">שליחת פנייה</h2>

            <div>
                <label htmlFor="subject" className="block mb-2">נושא הפנייה</label>
                <InputText
                    id="subject"
                    value={subjectOfInquiry}
                    onChange={(e) => setSubjectOfInquiry(e.target.value)}
                    className="w-full"
                />
            </div>

            <div>
                <label htmlFor="description" className="block mb-2">תיאור</label>
                <InputTextarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full"
                    autoResize
                />
            </div>

            <Button
                label="שלח פנייה"
                icon="pi pi-send"
                className="w-full mt-4"
                onClick={handleSubmit}
            />
        </div>
    );
};

export default AddInquiry;
