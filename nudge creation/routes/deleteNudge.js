const express = require('express');
const Nudge = require('../models/nudge');
const router = express.Router();

router.delete('/delete-nudge/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Nudge.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: 'Nudge not found' });
        }

        res.status(200).json({ message: 'Nudge deleted successfully' });
    } catch (error) {
        console.error('Error deleting nudge:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
