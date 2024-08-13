import express from 'express';
import authRouts from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouts);
app.use('/api/messages', messageRoutes);
server.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});
