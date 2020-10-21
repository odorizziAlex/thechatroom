const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const index = require('./routes/index');
// const port = process.env.PORT || 5000;
const port = process.PORT || 5000;
const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

const cors = require('cors');
const mongoose = require('mongoose');
// const io = require('socket.io');

require('dotenv').config({
    path: './.env'
});

const Users = require('./models/user.model');

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

}, 
/**
 * 
*/
function(err){
    if(err){
        console.log("server.js err line 44");
        throw err;
    }

    io.on('connection', (socket) => {
        console.log('user connected');
        socket.on('joinRoom', (data) => {
            console.log('user joined room');
            socket.join(data.myID);
        }) 
    })

    Users.watch().on('change', (change) => {
        console.log('socket says: something changed in db');
        console.log('change: ', change.fullDocument);
        io.emit('changes', 'the changes');
        // io.to(change.fullDocument._id).emit('changes',change.fullDocument)
    })
}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server ist running on port: ${port}`);
})