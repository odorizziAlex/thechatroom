const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Websocket
const bodyParser = require('body-parser');
const io = require('socket.io')(3100);
//

require('dotenv').config({
    path: './.env'
});

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//Websocket
// body-parser
app.use(bodyParser.json());
//

// collections
const usersRouter = require('./routes/users');
//
app.use('/users', usersRouter);

//Websocket
const Users = require('./models/user.model');
//
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

}, 
function(err){
    if(err){
        console.log("server.js err line 44");
        throw err;
    }

    io.on('connection', (socket) => {
        console.log('user connected');
        socket.on('joinRoom', (data) => { // data will look like => {myID: "123123"}
            console.log('user joined room');
            socket.join(data.myID);
        }) 
    })

    Users.watch().on('change', (change) => {
        console.log('socket says: something changed in db');
        console.log('socket change: ', change);
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