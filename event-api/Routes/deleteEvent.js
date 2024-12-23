// Routes/deleteEvent.js
const express = require('express');
const { ObjectId } = require('mongodb');
const { connectDB } = require('../utils/db');  // Correctly import connectDB

const router = express.Router();

// DELETE Event by ID
router.delete('/events/:id', async (req, res) => {
    const eventId = req.params.id;

    // Validate ID format
    if (!ObjectId.isValid(eventId)) {
        return res.status(400).send({ error: 'Invalid ID format' });
    }

    try {
        const db = await connectDB();  // Ensure we get the database instance
        const result = await db.collection('events').deleteOne({ _id: new ObjectId(eventId) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Event not found' });
        }

        res.send({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err.message);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});

module.exports = router;
