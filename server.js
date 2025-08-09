// server.js — final (Socket.IO + static + /events route)
const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve all files from current folder
app.use(express.static(__dirname));

// Realtime demo payload
io.on('connection', (s) => {
  console.log('client connected');
  s.emit('bracket:update', {
    rounds: [[{ a: { name: 'P1', score: 0 }, b: { name: 'P2', score: 0 } }]],
  });
});

// Explicit route for Events page
app.get(['/events', '/events.html'], (req, res) =>
  res.sendFile(path.join(__dirname, 'events.html'))
);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
