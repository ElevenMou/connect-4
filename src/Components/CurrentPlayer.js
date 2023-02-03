import React from 'react'

const GAME_STATE_PLAYING = 1;
const GAME_STATE_WIN = 2;
const GAME_STATE_DRAW = 3;

const CurrentPlayer = (props) => {
    return (
        <div className="current-player">
            <span>
                {props.gameState === GAME_STATE_PLAYING ? props.player + " turn" 
                : props.gameState === GAME_STATE_WIN ? props.player + " Won the game!" 
                : props.gameState === GAME_STATE_DRAW ? "No winner!" : ""}
            </span>
        </div>
    )
}

export default CurrentPlayer