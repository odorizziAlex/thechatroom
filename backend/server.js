const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Websocket
const http = require('http');
// const io = require('socket.io');
const socketIo = require('socket.io');
const index = require('./routes/index');
//

require('dotenv').config({
    path: './.env'
});

const app = express();
const port = process.env.PORT || 5000;

app.use(index);


//Websocket
// const Users = require('./models/user.model');
const server = http.createServer(app);
const io = socketIo(server);
let data;
io.on("connection", (socket) => {
    console.log("new client connected");
    if(data){
        data = undefined;
    }
    data = createData(socket);
    socket.on("disconnect", () => {
        console.log("client disconnected");
    })
});
const createData = socket => {
    const response = "this is THE response";
    socket.emit("FromAPI", response);
}   
//


app.use(cors());
app.use(express.json());
// collections
const usersRouter = require('./routes/users');
//
app.use('/users', usersRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

}, 
// function(err){
//     if(err){
//         console.log("server.js err line 44");
//         throw err;
//     }

//     io.on('connection', (socket) => {
//         console.log('user connected');
//         socket.on('joinRoom', (data) => { // data will look like => {myID: "123123"}
//             console.log('user joined room');
//             socket.join(data.myID);
//         }) 
//     })

//     Users.watch().on('change', (change) => {
//         console.log('socket says: something changed in db');
//         console.log('socket change: ', change);
//         // io.to(change.fullDocument._id).emit('changes',change.fullDocument)
//     })
// }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server ist running on port: ${port}`);
})