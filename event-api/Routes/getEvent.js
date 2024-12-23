const express = require('express');
const { ObjectId } = require('mongodb'); // Make sure to import ObjectId
const router = express.Router();
const { getDB } = require('../utils/db');

// GET route for fetching an event by ID
router.get('/events/:eventId', async (req, res) => {
    const { eventId } = req.params;

    try {
        const db = getDB();
        const event = await db.collection('events').findOne({ _id: new ObjectId(eventId) });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch event', details: err.message });
    }
});

module.exports = router;
