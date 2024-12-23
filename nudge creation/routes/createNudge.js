const express = require('express');
const Nudge = require('../models/nudge'); // Import Nudge model
const router = express.Router();

router.post('/create-nudge', async (req, res) => {
    const { eventName, title, image, sendTime, description, icon, invitationText } = req.body;

    // Check if all required fields are provided
    if (!eventName || !title || !image || !sendTime || !description || !icon || !invitationText) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new Nudge object
        const newNudge = new Nudge({
            eventName, 
            title, 
            image, 
            sendTime, 
            description, 
            icon, 
            invitationText
        });

        // Save the new Nudge to the database
        await newNudge.save();

        res.status(201).json({ message: 'Nudge created successfully', nudge: newNudge });
    } catch (error) {
        console.error('Error creating nudge:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
