const Inquiry = require('../models/inquiryModel');
const sendEmailToUser = require('../utils/sendEmailToUser');

async function addInquiry(req, res) {
    try {
        const newInquiry = new Inquiry(req.body);
        await newInquiry.save();
        await sendEmailToUser(req.body.userEmail, req.body.userName);
        res.status(201).send({ message: "Inquiry created successfully", Inquiry: newInquiry });
    }
    catch (error) {
        console.error("Error creating inquiry:", error);
        res.status(500).send({ error: error.message });
    }
};

async function deleteInquiry(req, res) {
    try {
        const inquiryId = req.params.id;
        if (!inquiryId)
            return res.status(400).send({ error: "ID is required" });
        const InqlD = await Inquiry.findById(inquiryId);
        if (!InqlD)
            return res.status(404).send({ error: "Inquiry not found" });
        await Inquiry.deleteOne({ _id: inquiryId });
        res.status(200).send({ message: "Deleted successfully", inquiry: InqlD });
    } catch (error) {
        console.error("Error deleting inquiry:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getAllInquies(req, res) {
    try {
        const inquiries = await Inquiry.find()
            .select();
        res.status(200).send(inquiries);
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

async function updateInquiry(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true, runValidators: true };
        const updatedInquiry = await Inquiry.findByIdAndUpdate(id, updates, options).select({ password: 0 });
        if (!updatedInquiry)
            return res.status(404).send({ message: "Inquiry not found" });
        res.status(200).send({ message: "Inquiry updated successfully", inquiry: updatedInquiry });
    } catch (error) {
        console.error("Error updating inquiry:", error);
        res.status(500).send({ error: error.message });
    };
};

async function getInquiryById(req, res) {
    try {
        const { id } = req.params;
        const inquiry = await Inquiry.findById(id);
        if (!inquiry)
            return res.status(404).send({ message: "Inquiry not found" });
        res.status(200).send(inquiry);
    } catch (error) {
        console.error("Error fetching inquiry:", error);
        res.status(500).send({ error: error.message });
    };
};

module.exports = {
    addInquiry,
    deleteInquiry,
    updateInquiry,
    getAllInquies,
    getInquiryById
}