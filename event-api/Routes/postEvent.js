const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/db');  // Import the getDB function

// POST route for creating an event
router.post('/events', async (req, res) => {
    const eventData = req.body;  // Capture all event data from the request body

    if (!eventData.eventName || !eventData.eventDate) {
        return res.status(400).json({ error: 'Event name and date are required.' });
    }

    // Add createdAt field to the event data
    eventData.createdAt = new Date();

    try {
        const db = getDB();  // Get the DB instance
        const result = await db.collection('events').insertOne(eventData);  // Insert event into DB

        // Ensure that the result contains the insertedId
        if (result.insertedId) {
            res.status(201).json({
                message: 'Event created successfully!',
                eventId: result.insertedId,
                eventData: { ...eventData, _id: result.insertedId },  // Return created event with inserted _id
            });
        } else {
            throw new Error('Failed to retrieve inserted ID');
        }
    } catch (err) {
        console.error('Error while creating event:', err);  // Log the detailed error
        res.status(500).json({ error: 'Failed to create event', details: err.message });
    }
});

module.exports = router;
