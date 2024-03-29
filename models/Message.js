const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        default: new Date().toLocaleString()
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);