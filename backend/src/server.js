const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const logToFile = require('./logToFile');

const createBotApiRouter = require('./botApi');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Simple health check
app.get('/', (req, res) => {
  res.send('Chess backend is running!');
});


const generateGameId = require('./generateGameId');
const { Chess } = require('chess.js');
// In-memory storage for active games (replace with DB later if needed)
const games = new Map(); // gameId → { players: [], board: Chess instance, ... }

// Use botApi router and pass games map
app.use(createBotApiRouter(games));

// REST endpoint to create a new game and return a unique gameId
app.post('/api/create-game', (req, res) => {
  const gameId = generateGameId();
  logToFile(`Creating new game with gameId: ${gameId}`);
  games.set(gameId, { players: [], board: new Chess() });
  res.json({ gameId });
});

io.on('connection', (socket) => {
  logToFile(`New user connected: ${socket.id}`);

  // Example: Join a game room
  socket.on('joinGame', (gameId) => {
    socket.join(gameId);
    logToFile(`Socket ${socket.id} joined game ${gameId}`);

    // Send current game state to the new player
    const game = games.get(gameId);
    if (game) {
      socket.emit('gameState', game);
    }
  });

  // Example: Receive a move
  socket.on('makeMove', ({ gameId, move }) => {
    const game = games.get(gameId);
    if (game) {
      // Validate and apply move (use chess.js here)
      // ... logic with chess.js

      // Broadcast updated state to both players
      io.to(gameId).emit('gameState', game);
    }
  });

  socket.on('disconnect', () => {
    logToFile(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logToFile(`Server running on port ${PORT}`);
});