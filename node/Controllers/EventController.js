const Event = require('../models/eventModel');

async function addEvent(req, res) {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).send({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send({ error: error.message });
    };
};

async function deleteEvent(req, res) {
    try {
        const eventId = req.params.id;
        if (!eventId)
            return res.status(400).send({ error: "ID is required" });
        const eventD = await Event.findById(eventId);
        if (!eventD)
            return res.status(404).send({ error: "Event not found" });
        await Event.deleteOne({ _id: eventId });
        res.status(200).send({ message: "Deleted successfully", event: eventD });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getAllEvents(req, res) {
    try {
        const events = await Event.find()
            .select();
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

async function updateEvent(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true, runValidators: true };
        const updatedEvent = await Event.findByIdAndUpdate(id, updates, options).select({ password: 0 });
        if (!updatedEvent)
            return res.status(404).send({ message: "Event not found" });
        res.status(200).send({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getEventById(req, res) {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).select({ password: 0 });
        if (!event)
            return res.status(404).send({ message: "Event not found" });
        res.status(200).send(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).send({ error: error.message });
    };
};

module.exports = {
    addEvent,
    deleteEvent,
    getAllEvents,
    updateEvent,
    getEventById
};