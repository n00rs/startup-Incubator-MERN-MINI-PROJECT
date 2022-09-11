const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    slotDay: {
        type: Date,
        required: true,
        expires: 0
    },
    appId: {
        type: String,
        default: null,

    },
    bookingStatus: {
        type: Boolean,
        default: false
    },
    section: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('slots', slotSchema)