const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json())

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const eventRoutes = require("./routes/eventRoutes");
const memorialRoutes = require("./routes/memorialRoutes");
const userRoutes = require("./routes/userRoutes");
const prayerTimeRoutes = require("./routes/prayerTimeRoutes");
const settingRoutes = require("./routes/settingRoutes");
const authRoutes = require("./routes/authRoutes");
const timesRoutes = require("./routes/timesRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/events", eventRoutes);
app.use("/memorials", memorialRoutes);
app.use("/prayer-times", prayerTimeRoutes);
app.use("/users", userRoutes);
app.use("/settings", settingRoutes);
app.use("/auth", authRoutes);
app.use("/times", timesRoutes);
app.use("/inquiries", inquiryRoutes);
app.use("/upload", uploadRoutes);

app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

app.listen(process.env.PORT, () => {
    console.log("running!!");
});
