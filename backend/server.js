const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


io.on('connection', socket => {
    
    socket.on('message', ({name, message, timestamp}) => {
        io.emit('message', {name, message, timestamp});
    })
    
    socket.on('userConnected', (name) => {
        io.emit('userConnected', name);
    })

    socket.on('disconnect', () => {
        io.emit('userDisconnected');
    })
})

http.listen(5000, function() {
    console.log('listening on port 5000');
})