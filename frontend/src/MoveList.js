import React from 'react';

function MoveList({ moves }) {
    return (
        <div className="move-list" style={{ marginTop: 20, background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px rgba(44,62,80,0.08)' }}>
            <h3 style={{ marginBottom: 12 }}>Moves</h3>
            {moves.length === 0 ? (
                <div style={{ color: '#888' }}>No moves yet.</div>
            ) : (
                <ol style={{ paddingLeft: 20 }}>
                    {moves.map((move, idx) => (
                        <li key={idx} style={{ marginBottom: 4 }}>
                            {move}
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}

export default MoveList;
