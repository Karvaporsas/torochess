import { useState, useEffect } from 'react';
import ChessContainer from './ChessContainer';
import Sidebar from './Sidebar';
import './App.css';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
                    <button className="btn">New Game</button>
                    <button className="btn">Login</button>
                </div>
            </header>

            <div className="main-container">
                {/* Left Sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} />

                {/* Main Content Area */}
                <main className="content">
                    <ChessContainer />
                </main>
            </div>
        </div>
    );
}

export default App;
