const express = require('express');
const Nudge = require('../models/nudge');
const router = express.Router();

router.put('/update-nudge/:id', async (req, res) => {
    const { id } = req.params;
    const { eventName, title, image, sendTime, description, icon, invitationText } = req.body;

    // Validate request data
    if (!eventName || !title || !sendTime || !description || !image || !icon || !invitationText) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const nudge = await Nudge.findByIdAndUpdate(id, {
            eventName, 
            title, 
            image, 
            sendTime, 
            description, 
            icon, 
            invitationText
        }, { new: true });

        if (!nudge) {
            return res.status(404).json({ error: 'Nudge not found' });
        }

        res.status(200).json({ message: 'Nudge updated successfully', nudge });
    } catch (error) {
        console.error('Error updating nudge:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
