import React from 'react';

function MoveList({ moves }) {
    return (
        <div className="move-list">
            <h3 className="move-list-title">Moves</h3>
            {moves.length === 0 ? (
                <div className="move-list-empty">No moves yet.</div>
            ) : (
                <ol className="move-list-ol">
                    {moves.map((move, idx) => (
                        <li
                            key={idx}
                            className={
                                'move-list-li ' + (idx % 2 === 0 ? 'move-list-li-white' : 'move-list-li-black')
                            }
                        >
                            {move}
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}

export default MoveList;
