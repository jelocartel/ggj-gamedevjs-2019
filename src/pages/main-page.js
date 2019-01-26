import React from 'react';
import './pages.css';

const page2 = ( props ) => {
    return (
        <div className='page'>
            <h1>Start Game</h1>
            <p>Choose numbers of players</p>
            <form>
                <label>
                    <input type="radio" name="playersNumber" value='1' checked='checked' onChange={props.playersNumber} />
                    1
                </label>
                <label>
                    <input type="radio" name="playersNumber" value='2' onChange={props.playersNumber}/>
                    2
                </label>
                <label>
                    <input type="radio" name="playersNumber" value='3' onChange={props.playersNumber}/>
                    3
                </label>
                <label>
                    <input type="radio" name="playersNumber" value='4' onChange={props.playersNumber}/>
                    4
                </label>
            </form>
            <form>
                {
                    new Array(props.number).fill(1).map( (el, index) => {
                        return (
                            <div key={index}>
                                <label>Car for player {index+1}:</label>
                                <select onChange={(evt) => props.setCar(index, evt)}>
                                    <option value='cyan' selected='selected'>cyan</option>
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