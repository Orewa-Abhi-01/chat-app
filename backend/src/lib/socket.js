const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io =  socketIo(server,{
    cors: {
        origin: ["http://localhost:5173"],
    }
});

function getReceiverSocketId(userId){
    return userSocketMap[userId];
}


//Make io accessible to our router
app.set('socketio', io);


// used to store online users
const userSocketMap = {}; //  { userId: socketId }


io.on('connection', (socket) => {
    console.log('A user connected', socket.id);


    const {userId}  = socket.handshake.query;
    console.log("userId", userId);
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    // io.emit() is used to send events to all connected clients
    io.emit('onlineUsers', Object.keys(userSocketMap));


    
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        // const userId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
        delete userSocketMap[userId];
        io.emit('onlineUsers', Object.keys(userSocketMap));
    });
});

module.exports  = { io, app, server, getReceiverSocketId };
