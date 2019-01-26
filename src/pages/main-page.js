import React from 'react';
import './pages.css';

const page2 = ( props ) => {
    return (
        <div className='page'>
            <h1>Start Game</h1>
            <p>Here some name inputs, cars select etc.</p>
            <button onClick={props.click}>Start Game</button>
        </div>
    )
}

export default page2;