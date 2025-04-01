const Setting = require('../models/settingModel');

async function addSetting(req, res) {
    try {
        const newSetting = new Setting(req.body);
        await newSetting.save();
        res.status(201).send({ message: "Setting created successfully", setting: newSetting });
    } catch (error) {
        console.error("Error creating setting:", error);
        res.status(500).send({ error: error.message });
    };
};

async function deleteSetting(req, res) {
    try {
        const settingId = req.params.id;
        if (!settingId)
            return res.status(400).send({ error: "ID is required" });
        const settingD = await Setting.findById(settingId);
        if (!settingD)
            return res.status(404).send({ error: "Setting not found" });
        await Setting.deleteOne({ _id: settingId });
        res.status(200).send({ message: "Deleted successfully", setting: settingD });
    } catch (error) {
        console.error("Error deleting setting:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getAllSettings(req, res) {
    try {
        const settings = await Setting.find()
            .select({ name: 1, value: 1 });
        res.status(200).send(settings);
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

async function updateSetting(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true, runValidators: true };
        const updatedSetting = await Setting.findByIdAndUpdate(id, updates, options).select({ value: 0 });
        if (!updatedSetting)
            return res.status(404).send({ message: "Setting not found" });
        res.status(200).send({ message: "Setting updated successfully", setting: updatedSetting });
    } catch (error) {
        console.error("Error updating setting:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getSetting(req, res) {
    try {
        const { id } = req.params;
        const setting = await Setting.findById(id).select({ value: 0 });
        if (!setting)
            return res.status(404).send({ message: "Setting not found" });
        res.status(200).send(setting);
    } catch (error) {
        console.error("Error fetching setting:", error);
        res.status(500).send({ error: error.message });
    };
};

async function resetSettings(req, res) {
    try {
        const defaultSettings = {
            themeColor: "light",
            layout: "grid",
            displayOptions: {
                showTime: true,
                showDate: true,
                showEvents: true
            }
        };
        await Setting.deleteMany({});
        const resetSettings = await Setting.create(defaultSettings);
        res.status(200).send({ message: "Settings reset to default successfully", settings: resetSettings });
    } catch (error) {
        console.error("Error resetting settings:", error);
        res.status(500).send({ error: error.message });
    };
};

module.exports = {
    addSetting,
    deleteSetting,
    getAllSettings,
    updateSetting,
    getSetting,
    resetSettings
};