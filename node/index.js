const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
dotenv.config()
const app = express()

app.use(cors()); // מאפשר גישה מה-Client
app.use(bodyParser.json());

//התחברות לmongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

//יבוא ראוטים
const eventRouter = require("./Routers/EventRouter")
const memorialRouter = require("./Routers/MemorialRouter")
const userRouter = require("./Routers/UserRouter")
const prayerTimeRouter = require("./Routers/PrayerTimeRouter")
const settingRouter = require("./Routers/SettingRouer")

//שימוש בנתיבים
app.use("/events", eventRouter);
app.use("/memorials", memorialRouter);
app.use("/prayer-times", prayerTimeRouter);
app.use("/users", userRouter);
app.use("/settings", settingRouter);

//טיפול בשגיאות גלובליות
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

//הפעלת השרת
app.listen(process.env.PORT, () => {
    console.log("running!!")
})