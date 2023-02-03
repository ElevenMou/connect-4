import React, { useEffect, useState } from 'react';
import GameCircle from './GameCircle';
import CurrentPlayer from './CurrentPlayer';
import { isWinner, isDraw } from '../Helper';

const GAME_STATE_IDLE = 0;
const GAME_STATE_PLAYING = 1;
const GAME_STATE_WIN = 2;
const GAME_STATE_DRAW = 3;

const GameBoard = () => {

    const [player1, setPlayer1] = useState([1, "player1", "#DECE9C", 0]);
    const [player2, setPlayer2] = useState([2, "player2", "#A21232", 0]);

    const [GameBoard, setGameBoard] = useState(Array(49).fill(0));
    const [player, SetPlayer] = useState(player1);
    const [gameState, setGameState] = useState(GAME_STATE_IDLE);

    const circleClicked = (id) => {
        if(GameBoard[id] !== 0 || gameState !== GAME_STATE_PLAYING) {
            return;
        } else {
            if(isWinner(GameBoard, id, player[0])) {
                setGameState(GAME_STATE_WIN);
                if(player[0] === 1) {
                    setPlayer1((prev) => {
                        return [prev[0], prev[1], prev[2], prev[3]++];
                    });
                } else {
                    setPlayer2((prev) => {
                        return [prev[0], prev[1], prev[2], prev[3]++];
                    });
                }
            } else if(isDraw(GameBoard, id, player[0])) {
                setGameState(GAME_STATE_DRAW);
            }
            else {
                setGameBoard(prev => {
                    return prev.map((value, pos) => {
                        if(pos === id) return player[0];
                        return value;
                    })
                });
                SetPlayer(player[0] === 1 ? player2 : player1);
            }
            
        }
    }

    const renderCircle = (id) => {
        return (
            <GameCircle key={id} id={id} statu={GameBoard[id]} onCircleClicked={circleClicked}/>
        )
    }

    const initGameBoard = () => {
        const circles = [];
        for(let i = 0; i < 49 ; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const handleFirstPlayerName = (e) => {
        setPlayer1((prev) => {
            return [prev[0], e.target.value, prev[2], prev[3]];
        });
    }

    const handleFirstPlayerColor = (e) => {
        setPlayer1((prev) => {
            return [prev[0], prev[1], e.target.value, prev[3]];
        });
    }

    const handleSecondPlayerName = (e) => {
        setPlayer2((prev) => {
            return [prev[0], e.target.value, prev[2], prev[3]];
        });
    }

    const handleSecondPlayerColor = (e) => {
        setPlayer2((prev) => {
            return [prev[0], prev[1], e.target.value, prev[3]];
        });
    }

    const handleStartGame = () => {
        setGameBoard(Array(49).fill(0));
        setGameState(GAME_STATE_PLAYING);
        document.documentElement.style.setProperty('--color-player-1', player1[2]);
        document.documentElement.style.setProperty('--color-player-2', player2[2]);
        SetPlayer(player1);
    }

    const handleNewtGame = () => {
        setGameState(GAME_STATE_IDLE);
        setPlayer1([1, "player1", "#DECE9C", 0]);
        setPlayer2([2, "player2", "#A21232", 0]);
    }

    /* OnInitialize */
    useEffect(()=> {
        handleNewtGame();
    }, []);

    return (
        <>

            {gameState === GAME_STATE_IDLE ? 
                <div className='game-idle'>
                    <div className="form-group">
                        <label for="player1_name">Player 1</label>
                        <input type="text" className="form-control" name="player1_name" id='player1_name' onChange={handleFirstPlayerName}/>
                        <label for="player1_color" className='hide'>Color 1</label>
                        <input type="color" className="color" name="player1_name" id='player1_name' value={player1[2]} onChange={handleFirstPlayerColor}/>
                    </div>

                    <div className="form-group">
                        <label for="player2_name">Player 2</label>
                        <input type="text" className="form-control" name="player2_name" id='player2_name' onChange={handleSecondPlayerName}/>
                        <label for="player2_color" className='hide'>Color 2</label>
                        <input type="color" className="color" name="player2_name" id='player2_name' value={player2[2]} onChange={handleSecondPlayerColor}/>
                    </div>

                    <div className="form-group">
                        <button type='button' className='btn btn-primary' onClick={handleStartGame}>Start game</button>
                    </div>
                </div>
            : gameState === GAME_STATE_PLAYING ? 
                <>
                    <CurrentPlayer player={player[1]} gameState={gameState} />
                    <div className='game-board'>
                        {initGameBoard()}
                    </div>
                </>
            :
                <>
                    <CurrentPlayer player={player[1]} gameState={gameState}/>
                    <div className='game-idle'>
                        <div className='result'>
                            <div className='result__player'>
                                <div className='result__player-name'>
                                    {player1[1]}
                                </div>
                                {player1[3]}
                            </div>
                            <div className='result__player'>
                                <div className='result__player-name'>
                                    {player2[1]}
                                </div>
                                {player2[3]}
                            </div>
                        </div>
                        <div className="form-group">
                            <button type='button' className='btn btn-primary' onClick={handleStartGame}>Replay</button>
                        </div>
                        <div className="form-group">
                            <button type='button' className='btn' onClick={handleNewtGame}>New game</button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default GameBoard