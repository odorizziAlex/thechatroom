const express = require('express');
const mongoose = require('mongoose');
const messages = require('./routes/api/messages');

const app = express();

// bodyparser middleware deprecated. Instead use:
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose
    .connect(db)
    .then(()=>console.log("MongoDB connected..."))
    .catch(err=>console.log(err))

const PORT = process.env.PORT || 5000

// implementing socket io
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    
    socket.on('message', ({_id, name, message, timestamp}) => {
        io.emit('message', {_id, name, message, timestamp});
    })

    // message delete?
    socket.on('messageDeleted', (_id) => {
        console.log("messageDeleted", _id);
        io.emit('messageDeleted', _id);
    })
    
    socket.on('userConnected', (name) => {
        io.emit('userConnected', name);
    })
    
    socket.on('disconnect', () => {
        io.emit('userDisconnected');
    })
})

// Use Routes
app.use('/api/messages', messages);

//----------------
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))