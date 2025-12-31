import { Chessboard } from 'react-chessboard';
import './ChessContainer.css';
import React, { useRef, useState } from 'react';
import MoveList from './MoveList';
import { Chess } from 'chess.js';


function ChessContainer({ gameId }) {    
    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;
    const [chessPosition, setChessPosition] = useState(chessGame.fen());
    const [turn, setTurn] = useState(chessGame.turn());
    const [moves, setMoves] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    if (!gameId) return <div>Loading game...</div>;

    function updatePositionAndTurn() {
        setChessPosition(chessGame.fen());
        setTurn(chessGame.turn());        
        setMoves(chessGame.history({ verbose: false }));
    }
    console.log('Rendering ChessContainer for gameId:', gameId);
    async function makeBotMove(playerMove) {
        // Call backend API to get bot move, sending gameId and the player's move      
        try {
            const response = await fetch('http://localhost:5000/api/bot-move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gameId, move: playerMove })
            });
            const data = await response.json();
            console.log('Bot move response:', data);
            if (data.status === 'gameover') {
                updatePositionAndTurn();
                setGameOver(true);
                setWinner(data.winner);
                return;
            }
            if (data.status === 'ok' && data.move && data.fen) {
                chessGame.move(data.move);
                updatePositionAndTurn();
            } else if (data.fen) {
                chessGame.load(data.fen);
                updatePositionAndTurn();
            } else {
                console.log('Bot move error:', data);
            }
        } catch (e) {
            console.error('API error:', e);
        }
    }

    async function onPieceDrop(sourceSquare, targetSquare, piece) {
        if (!targetSquare) return false;
        const playerMove = { from: sourceSquare, to: targetSquare, promotion: 'q' };        
        try {
            chessGame.move(playerMove);
            // Let backend validate and update state
            await makeBotMove(playerMove);
            return true;
        } catch (error) {
            console.log('Invalid move:', error);
            return false;
        }
    }

    return (
        <div className="chess-container">
            <div className="chess-flex-layout">
                <div className="chessboard-section">
                    <Chessboard
                        position={chessPosition}
                        arePiecesDraggable={!gameOver}
                        onPieceDrop={onPieceDrop}
                        id={gameId}
                    />
                    {gameOver && (
                        <div className="gameover-overlay">
                            <h2 className="gameover-title">Game Over</h2>
                            <div className="gameover-winner">
                                {winner ? `Winner: ${winner.charAt(0).toUpperCase() + winner.slice(1)}` : 'Draw'}
                            </div>
                            <button
                                className="btn gameover-btn"
                                onClick={() => window.location.reload()} //TODO better reset
                            >
                                New Game
                            </button>
                        </div>
                    )}
                    <div className="game-info">
                        <p className="turn-indicator">{turn === 'w' ? 'White' : 'Black'} to move</p>
                        <button className="btn-resign">Resign</button>
                        <button className="btn-draw">Offer Draw</button>
                    </div>
                </div>
                <div className="movelist-section">
                    <MoveList moves={moves} />
                </div>
            </div>
        </div>
    );
}

export default ChessContainer;
