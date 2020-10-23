const express = require('express');
const socketIo = require('socket.io');
const index = require('./routes/index');
// const port = process.env.PORT || 5000;
const port = process.PORT || 5000;
const app = express();
app.use(index);

// const server = http.createServer(app);
const server = app.listen(port, () => {
    console.log(`Server ist running on port: ${port}`);
})
const io = socketIo(server).listen(server);

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
        // socket.on('joinRoom', (data) => {
        //     console.log('user joined room');
        //     socket.join(data.myID);
        // }) 

        socket.on("new-chat-user", (data) => {
            io.emit("new-user-joined", data);
        })

        socket.on('disconnect', (socket) => {
            console.log('user disconnected');
        })
    })



    

    Users.watch().on('change', (change) => {
        console.log('socket says: something changed in db');
        console.log('change: ', change);
        console.log('-------------------');
        // io.emit('changes', 'the changes');
        io.to(change.fullDocument).emit('changes', change.fullDocument)
    })
}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// app.listen(port, () => {
//     console.log(`Server ist running on port: ${port}`);
// })

/**
 * OLD CODE BACKUP
 * 
 const express = require('express');
const socketIo = require('socket.io');
const index = require('./routes/index');
// const port = process.env.PORT || 5000;
const port = process.PORT || 5000;
const app = express();
app.use(index);

// const server = http.createServer(app);
app.listen(port, () => {
    console.log(`Server ist running on port: ${port}`);
})
const server = app.listen(port, () => {
    console.log(`Server ist running on port: ${port}`);
})
const io = socketIo(server).listen(server);

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

}, (err) => {
    if(err){
        console.error("Error MongoDB: ",err);
    }
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

io.on('connection', (socket) => {
    console.log('user connected');
    // socket.on('joinRoom', (data) => {
    //     console.log('user joined room');
    //     socket.join(data.myID);
    // }) 

    socket.on("new-chat-user", (data) => {
        io.emit("new-user-joined", data);
    })

    socket.on('disconnect', (socket) => {
        console.log('user disconnected');
    })
})
 */