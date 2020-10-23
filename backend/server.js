/**
 * CONNECT TO MONGO-DB WITH EXPRESS SERVER
 * 
 */
const express = require('express');
const port = process.PORT || 5000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({
    path: './.env'
});

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {  
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

}, (err) => {
    if(err){
        console.error("Error MongoDB: ",err);
    }
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

/**
 * CREATE SOCKET CONNECTION FOR REALTIME UPDATES FOR EVERY USER
 */

const server = app.listen(port, () => {
    console.log(`Server ist running on port: ${port}`);
})

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on("new-user-created", (data) => {
        io.emit("new-user-joined", data);
    })

    socket.on('disconnect', (socket) => {
        console.log('user disconnected');
    })
})


