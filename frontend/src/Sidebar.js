import React from 'react';

function Sidebar({ sidebarOpen }) {
    return (
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <nav>
                <ul>
                    <li className="active">
                        <span className="icon">P</span>
                        <span className="text">Play Online</span>
                    </li>
                    <li>
                        <span className="icon">C</span>
                        <span className="text">Play vs Computer</span>
                    </li>
                    <li>
                        <span className="icon">Z</span>
                        <span className="text">Puzzles</span>
                    </li>
                    <li>
                        <span className="icon">L</span>
                        <span className="text">Lessons</span>
                    </li>
                    <li>
                        <span className="icon">A</span>
                        <span className="text">Analysis Board</span>
                    </li>
                    <li>
                        <span className="icon">H</span>
                        <span className="text">Game History</span>
                    </li>
                    <li>
                        <span className="icon">S</span>
                        <span className="text">Settings</span>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
