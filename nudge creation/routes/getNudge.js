const express = require('express');
const Nudge = require('../models/nudge');
const router = express.Router();

router.get('/get-nudge/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const nudge = await Nudge.findById(id);

        if (!nudge) {
            return res.status(404).json({ error: 'Nudge not found' });
        }

        res.status(200).json(nudge);
    } catch (error) {
        console.error('Error fetching nudge:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
