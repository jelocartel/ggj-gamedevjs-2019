import React from 'react';
import './pages.css';

const page2 = ( props ) => {
    let numberOfPlayers = props.players.length;
    return (
        <div className='page'>
            <h1>Start Game</h1>
            <p>Choose numbers of players</p>
            <form>
                <label className={numberOfPlayers === 1 ? "radio chosen" : "radio"}>
                    <input type="radio" name="playersNumber" value='1'
                        checked={numberOfPlayers === 1} onChange={props.playersNumber} />
                    1
                </label>
                <label className={numberOfPlayers === 2 ? "radio chosen" : "radio"}>
                    <input type="radio" name="playersNumber" value='2'
                        checked={numberOfPlayers === 2} onChange={props.playersNumber}/>
                    2
                </label>
                <label className={numberOfPlayers === 3 ? "radio chosen" : "radio"}>
                    <input type="radio" name="playersNumber" value='3'
                        checked={numberOfPlayers === 3} onChange={props.playersNumber}/>
                    3
                </label>
                <label className={numberOfPlayers === 4 ? "radio chosen" : "radio"}>
                    <input type="radio" name="playersNumber" value='4'
                        checked={numberOfPlayers === 4} onChange={props.playersNumber}/>
                    4
                </label>
            </form>
            <form>
                {
                    props.players.map( (playerColor, index) => {
                        return (
                            <div key={index} className="car-label">
                                <label>Car for player {index+1}:</label>
                                <select
                                    value={playerColor}
                                    onChange={(evt) => props.setCar(index, evt)}>
                                    <option value='cyan'>cyan</option>
                                    <option value='magenta'>magenta</option>
                                    <option value='blue'>blue</option>
                                    <option value='yellow'>yellow</option>
                                </select>
                            </div>
                        )
                    })
                }
            </form>
            <button onClick={props.start}>Start Game</button>
        </div>
    )
}

export default page2;
