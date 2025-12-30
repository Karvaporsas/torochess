
const express = require('express');
const cors = require('cors');
const { Chess } = require('chess.js');
const logToFile = require('./logToFile');

function createBotApiRouter(games) {
  const router = express.Router();
  router.use(cors());
  router.use(express.json());

  // POST /api/bot-move
  // Body: { gameId: string, move: { from, to, promotion } }
  // Returns: { move: { from, to, promotion }, status: 'ok' } or { status: 'error', reason }
  router.post('/api/bot-move', (req, res) => {
    const { gameId, move } = req.body;
    logToFile(`[bot-move] Request: ${JSON.stringify(req.body)}`);
    if (!gameId || !move) {
      logToFile(`[bot-move] Error: Missing gameId or move`);
      return res.status(400).json({ status: 'error', reason: 'Missing gameId or move' });
    }
    if (!games || !games.has(gameId)) {
      logToFile(`[bot-move] Error: Game not found for gameId ${gameId}`);
      return res.status(404).json({ status: 'error', reason: 'Game not found' });
    }
    try {
      const gameObj = games.get(gameId);
      const chess = gameObj.board;
      // Apply player's move
      const result = chess.move(move);
      if (!result) {
        logToFile(`[bot-move] Error: Illegal move ${JSON.stringify(move)} for gameId ${gameId}`);
        return res.status(400).json({ status: 'error', reason: 'Illegal move' });
      }
      if (chess.isGameOver()) {
        logToFile(`[bot-move] Game over for gameId: ${gameId}`);
        return res.json({ status: 'gameover', reason: 'Game over', winner: chess.turn() === 'w' ? 'black' : 'white' });
      }
      // Bot makes a random move
      const possibleMoves = chess.moves({ verbose: true });
      if (possibleMoves.length === 0) {
        logToFile(`[bot-move] No legal moves for gameId: ${gameId}`);
        return res.json({ status: 'nomoves', reason: 'No legal moves' });
      }
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      chess.move(randomMove);
      logToFile(`[bot-move] Bot move: ${JSON.stringify(randomMove)} for gameId: ${gameId}`);
      return res.json({ status: 'ok', move: { from: randomMove.from, to: randomMove.to, promotion: randomMove.promotion || null }, fen: chess.fen() });
    } catch (e) {
      logToFile(`[bot-move] Exception: ${e.message} for gameId: ${gameId}`);
      return res.status(400).json({ status: 'error', reason: e.message });
    }
  });

  return router;
}

module.exports = createBotApiRouter;
