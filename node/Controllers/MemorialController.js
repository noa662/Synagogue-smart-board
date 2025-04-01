const Memorial = require('../models/memorialModel');

async function addMemorial(req, res) {
    try {
        const newMemorial = new Memorial(req.body);
        await newMemorial.save();
        res.status(201).send({ message: "Memorial created successfully", memorial: newMemorial });
    } catch (error) {
        console.error("Error creating memorial:", error);
        res.status(500).send({ error: error.message });
    };
};

async function deleteMemorial(req, res) {
    try {
        const memorialId = req.params.id;
        if (!memorialId)
            return res.status(400).send({ error: "ID is required" });
        const memorialD = await Memorial.findById(memorialId);
        if (!memorialD)
            return res.status(404).send({ error: "Memorial not found" });
        await Memorial.deleteOne({ _id: memorialId });
        res.status(200).send({ message: "Deleted successfully", memorial: memorialD });
    } catch (error) {
        console.error("Error deleting memorial:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getAllMemorials(req, res) {
    try {
        const memorials = await Memorial.find()
            .select({ name: 1, date: 1, location: 1 });
        res.status(200).send(memorials);
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

async function updateMemorial(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true, runValidators: true };
        const updatedMemorial = await Memorial.findByIdAndUpdate(id, updates, options).select({ password: 0 });
        if (!updatedMemorial)
            return res.status(404).send({ message: "Memorial not found" });
        res.status(200).send({ message: "Memorial updated successfully", memorial: updatedMemorial });
    } catch (error) {
        console.error("Error updating memorial:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getMemorialById(req, res) {
    try {
        const { id } = req.params;
        const memorial = await Memorial.findById(id);
        if (!memorial)
            return res.status(404).send({ message: "Memorial not found" });
        res.status(200).send(memorial);
    } catch (error) {
        console.error("Error fetching memorial:", error);
        res.status(500).send({ error: error.message });
    };
};

module.exports = {
    addMemorial,
    deleteMemorial,
    getAllMemorials,
    updateMemorial,
    getMemorialById
};