import React from 'react'

const GameCircle = (props) => {

    return (
        <div className={`game-circle ${props.statu === 1 ? "player-1" : props.statu === 2 ? "player-2" : ""}`} onClick={() => props.onCircleClicked(props.id)}>
            &nbsp;
        </div>
    )
}

export default GameCircle;