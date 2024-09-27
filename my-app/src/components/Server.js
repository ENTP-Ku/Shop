const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from your frontend
    methods: ["GET", "POST"]
  }
});

// Handle socket connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast message to all connected clients
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Socket server running on port 4000');
});
