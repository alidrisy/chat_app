import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
const userSocketMap = {};
io.on('connection', (socket) => {
    // console.log('a user connected', socket.id);
    const userId = socket.handshake.query.userId;
    if (userId)
        userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        // console.log('a user disconnected', socket.id);
        const userId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
        if (userId)
            delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});
export { app, server, io };
