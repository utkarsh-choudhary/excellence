import app from './app.js';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

// Real-time notifications setup
const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('subscribe', (data) => {
        console.log(`${data.user} subscribed to notifications`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
