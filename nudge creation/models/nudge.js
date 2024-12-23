const mongoose = require('mongoose');

const nudgeSchema = new mongoose.Schema({
    eventName: { type: String, required: true},
    title: { type: String, required: true },
    image: { type: String, required: true },
    sendTime: { type: Date, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    invitationText: { type: String, required: true }
}, { timestamps: true });

const Nudge = mongoose.model('Nudge', nudgeSchema);
module.exports = Nudge;