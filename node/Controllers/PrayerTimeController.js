const PrayerTime = require('../models/prayerTimeModel');
const { calculateHalachicTimes } = require('../utils/halachicTimesCalculator');

async function getAllPrayerTimes(req, res) {
    try {
        const prayerTimes = await PrayerTime.find();
        res.status(200).send(prayerTimes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

async function getPrayerTimeById(req, res) {
    try {
        const { id } = req.params;
        const prayerTime = await PrayerTime.findById(id).select({ password: 0 });
        if (!prayerTime)
            return res.status(404).send({ message: "Prayer time not found" });
        res.status(200).send(prayerTime);
    } catch (error) {
        console.error("Error fetching prayer time:", error);
        res.status(500).send({ error: error.message });
    };
};

async function addPrayerTime(req, res) {
    console.log("gyerighur")
    try {
        const newPrayerTime = new PrayerTime(req.body);
        await newPrayerTime.save();
        res.status(201).send({ message: "Prayer time created successfully", prayerTime: newPrayerTime });
    } catch (error) {
        console.error("Error creating prayer time:", error);
        res.status(500).send({ error: error.message });
    };
};

async function updatePrayerTime(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true, runValidators: true };
        const updatedPrayerTime = await PrayerTime.findByIdAndUpdate(id, updates, options).select({ password: 0 });
        if (!updatedPrayerTime)
            return res.status(404).send({ message: "Prayer time not found" });
        res.status(200).send({ message: "Prayer time updated successfully", prayerTime: updatedPrayerTime });
    } catch (error) {
        console.error("Error updating prayer time:", error);
        res.status(500).send({ error: error.message });
    };
};

async function deletePrayerTime(req, res) {
    try {
        const prayerTimeId = req.params.id;
        if (!prayerTimeId)
            return res.status(400).send({ error: "ID is required" });
        const prayerTimeD = await PrayerTime.findById(prayerTimeId);
        if (!prayerTimeD)
            return res.status(404).send({ error: "Prayer time not found" });
        await PrayerTime.deleteOne({ _id: prayerTimeId });
        res.status(200).send({ message: "Deleted successfully", prayerTime: prayerTimeD });
    } catch (error) {
        console.error("Error deleting prayer time:", error);
        res.status(500).send({ error: error.message });
    };
};

const getPrayerTimesByDate = async (req, res) => {
    console.log("Function called with date:", req.query.date);
    try {
        const { date } = req.query;
        if (!date)
            return res.status(400).json({ error: "Date parameter is required" });
        const formattedDate = new Date(date).toISOString().split("T")[0];
        const prayerTimes = await PrayerTime.find({ date: formattedDate });
        if (!prayerTimes || prayerTimes.length === 0)
            return res.status(404).json({ error: "No prayer times found for this date" });

        res.json(prayerTimes[0]);
    } catch (error) {
        console.error("Error fetching prayer time:", error);
        res.status(500).json({ error: "Error fetching prayer times" });
    }
};

async function getPrayerTimesByLocation(req, res) {
    try {
        const { latitude, longitude } = req.query;
        if (!latitude || !longitude)
            return res.status(400).send({ error: "Latitude and longitude are required" });
        const prayerTimes = await calculateHalachicTimes({ latitude, longitude });
        res.status(200).send(prayerTimes);
    } catch (error) {
        console.error("Error calculating prayer times by location:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getPrayerTimesByCity(req, res) {
    try {
        const { city } = req.query;
        if (!city)
            return res.status(400).send({ error: "City is required" });
        const prayerTimes = await calculateHalachicTimes({ city });
        res.status(200).send(prayerTimes);
    } catch (error) {
        console.error("Error calculating prayer times by city:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getPrayerTimesByCountry(req, res) {
    try {
        const { country } = req.query;
        if (!country)
            return res.status(400).send({ error: "Country is required" });
        const prayerTimes = await calculateHalachicTimes({ country });
        res.status(200).send(prayerTimes);
    } catch (error) {
        console.error("Error calculating prayer times by country:", error);
        res.status(500).send({ error: error.message });
    };
};

module.exports = {
    getAllPrayerTimes,
    getPrayerTimeById,
    addPrayerTime,
    updatePrayerTime,
    deletePrayerTime,
    getPrayerTimesByDate,
    getPrayerTimesByLocation,
    getPrayerTimesByCity,
    getPrayerTimesByCountry,
};
