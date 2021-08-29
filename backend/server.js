const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    console.log("user connected");

    socket.on('message', ({name, message}) => {
        io.emit('message', {name,message})
    })

    socket.on('disconnect', () => {
        console.log("user disconnected");
        io.emit('userDisconnected');
    })
})

http.listen(5000, function() {
    console.log('listening on port 5000');
})