// Routes/putEvent.js
const express = require('express');
const { ObjectId } = require('mongodb');
const { connectDB } = require('../utils/db'); // Import connectDB function

const router = express.Router();

// PUT Event by ID
router.put('/events/:id', async (req, res) => {
    const eventId = req.params.id;
    const { eventName, eventDate, description } = req.body;

    // Validate ID format
    if (!ObjectId.isValid(eventId)) {
        return res.status(400).send({ error: 'Invalid ID format' });
    }

    // Validate request body
    if (!eventName || !eventDate || !description) {
        return res.status(400).send({ error: 'Atleast (eventName, eventDate, description) are required' });
    }

    try {
        const db = await connectDB();  // Ensure we get the database instance
        const result = await db.collection('events').updateOne(
            { _id: new ObjectId(eventId) },
            { $set: { eventName, eventDate, description } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({ error: 'Event not found' });
        }

        res.send({ message: 'Event updated successfully' });
    } catch (err) {
        console.error('Error updating event:', err.message);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});

module.exports = router;
