const Testimonial = require('../models/Testimonial');

// Create new testimonial (POST)
exports.createTestimonial = async (req, res) => {
    try {
        const { name, phoneNumber, message } = req.body;

        const testimonial = new Testimonial({
            name,
            phoneNumber,
            message,
            verified: false
        });

        await testimonial.save();
        res.status(201).json({ success: true, message: "Testimonial submitted!", testimonial });

    } catch (error) {
        console.error("Create Error:", error);
        res.status(500).json({ success: false, message: "Failed to create testimonial" });
    }
};

// Get All testimonials (Admin or website if only showing verified)
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, testimonials });
        
    } catch (error) {
        console.error("List Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
    }
};

// Get Single testimonial (Edit Page)
exports.getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }

        res.status(200).json({ success: true, testimonial });

    } catch (error) {
        console.error("Find Error:", error);
        res.status(500).json({ success: false, message: "Failed to get testimonial" });
    }
};

// Update testimonial details (PUT)
exports.updateTestimonial = async (req, res) => {
    try {
        const { name, phoneNumber, message } = req.body;

        const updated = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { name, phoneNumber, message },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }

        res.status(200).json({ success: true, message: "Updated successfully", updated });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ success: false, message: "Failed to update testimonial" });
    }
};

// Update Verified Status (PATCH)
exports.updateVerifiedStatus = async (req, res) => {
    try {
        const { verified } = req.body;

        const updated = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { verified },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }

        res.status(200).json({ success: true, message: "Verification status updated", updated });

    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ success: false, message: "Failed to update verification status" });
    }
};

// Delete testimonial
exports.deleteTestimonial = async (req, res) => {
    try {
        const deleted = await Testimonial.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }

        res.status(200).json({ success: true, message: "Deleted successfully" });

    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ success: false, message: "Failed to delete testimonial" });
    }
};
