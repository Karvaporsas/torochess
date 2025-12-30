import { Chessboard } from 'react-chessboard';
import React, { useRef, useState } from 'react';
import { Chess } from 'chess.js';

function ChessContainer() {
    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;
    
    // FEN string of current position. FEN refers to Forsyth-Edwards Notation. It's from the chess world
    const [chessPosition, setChessPosition] = useState(chessGame.fen()); 
    const [turn, setTurn] = useState(chessGame.turn());

    function makeRandomMove() {
        const possibleMoves = chessGame.moves();

        if (chessGame.isGameOver() || possibleMoves.length === 0) return;

        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        chessGame.move(randomMove);

        updatePositionAndTurn();
    }

    function updatePositionAndTurn() {
        setChessPosition(chessGame.fen());
        setTurn(chessGame.turn());
    }

    function onPieceDrop(sourceSquare, targetSquare, piece) {
        console.log(`Piece moved from ${sourceSquare} to ${targetSquare}`);
        if (!targetSquare) return false;

        try {
            chessGame.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
            updatePositionAndTurn();

            // Mock some bot-like behavior by making a random move after player's move
            setTimeout(makeRandomMove, 500);
            
            return true;
        } catch (error)  {
            console.log('Invalid move:', error);
            return false;
        }
    }

    /* 
    <Chessboard
                position={chessPosition}
                arePiecesDraggable={true}
                onPieceDrop={onPieceDrop}
                onSquareClick={(square) => console.log('Square clicked:', square)}
                id="DefaultChessboard"
            />
    */

    return (
        <div className="chess-container">
            <Chessboard
                position={chessPosition}
                arePiecesDraggable={true}
                onPieceDrop={onPieceDrop}
                onSquareClick={(square) => alert("Clicked: " + square)}
                id="DefaultChessboard"
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
