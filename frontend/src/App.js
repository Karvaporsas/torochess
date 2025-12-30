import { useState, useEffect } from 'react';
import ChessContainer from './ChessContainer';
import Sidebar from './Sidebar';
import './App.css';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [gameId, setGameId] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleCreateGame() {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/create-game', {
                method: 'POST',
            });
            const data = await response.json();
            setGameId(data.gameId);
        } catch (e) {
            console.error('Failed to create game:', e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <button
                    className="menu-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    ☰
                </button>
                <h1>♟️ ToroChess</h1>
                <div className="header-actions">
                    <button className="btn" onClick={handleCreateGame} disabled={loading || !!gameId}>
                        {loading ? 'Creating...' : 'New Game'}
                    </button>
                    <button className="btn">Login</button>
                </div>
            </header>

            <div className="main-container">
                {/* Left Sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} />

                {/* Main Content Area */}
                <main className="content">
                    {!gameId ? (
                        <div style={{ textAlign: 'center', marginTop: '60px' }}>
                            <button
                                className="btn big-btn"
                                onClick={handleCreateGame}
                                disabled={loading}
                                style={{
                                    fontSize: '2rem',
                                    padding: '24px 48px',
                                    background: 'linear-gradient(90deg, #34495e 0%, #415b76 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 16px rgba(44,62,80,0.15)',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'background 0.3s, box-shadow 0.3s',
                                }}
                            >
                                {loading ? 'Creating...' : 'Start New Game'}
                            </button>
                        </div>
                    ) : (
                        <ChessContainer gameId={gameId} />
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;
