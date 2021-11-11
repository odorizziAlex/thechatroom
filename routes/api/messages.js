const express = require('express');
const router = express.Router();

// Message Model
const Message = require('../../models/Message');

// @route   GET api/messages
// @desc    Get all messages
// @access  Public
router.get('/', (req, res) => {
    Message.find()
        .sort({ date: 1 })
        .then(messages => res.json(messages))
        .catch(err => res.status(404).json({
            success: false,
            error: err
        }));
});

// @route   POST api/messages
// @desc    Create a message
// @access  Public
router.post('/', (req, res) => {
    const newMessage = new Message({
        id: req.body.id,
        name: req.body.name,
        message: req.body.message,
        // NOTE date could be an issue???
    });
    newMessage.save()
        .then(message => res.json(message))
        .catch(err => res.status(404).json({
            success: false,
            error: err
        }));
});

// @route   DELETE api/messages/:id
// @desc    Delete a message
// @access  Public
router.delete('/:id', (req, res) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            message.message = "(this message has been deleted)";
            message.save();
            res.json(message);
        })
        .catch(err => res.status(404).json({
            success: false,
            error: err
        }));
});

module.exports = router;