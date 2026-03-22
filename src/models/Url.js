const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    long_url: {
        type: String,
        required: [true, 'Please provide a long URL']
    },
    short_code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    expiry: {
        type: Number // expiration in unix timestamp (seconds or milliseconds)
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Url', urlSchema);
