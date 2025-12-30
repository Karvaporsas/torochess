import { Chessboard } from 'react-chessboard';
import React, { useRef, useState } from 'react';
import { Chess } from 'chess.js';


function ChessContainer({ gameId }) {    
    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;
    const [chessPosition, setChessPosition] = useState(chessGame.fen());
    const [turn, setTurn] = useState(chessGame.turn());

    if (!gameId) return <div>Loading game...</div>;

    function updatePositionAndTurn() {
        setChessPosition(chessGame.fen());
        setTurn(chessGame.turn());
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
            if (data.status === 'ok' && data.move && data.fen) {
                chessGame.load(data.fen);
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
            <Chessboard
                position={chessPosition}
                arePiecesDraggable={true}
                onPieceDrop={onPieceDrop}                
                id= {gameId }
            />
            <div className="game-info">
                <p className="turn-indicator">{turn === 'w' ? 'White' : 'Black'} to move</p>
                <button className="btn-resign">Resign</button>
                <button className="btn-draw">Offer Draw</button>
            </div>
        </div>
    );
}

export default ChessContainer;
