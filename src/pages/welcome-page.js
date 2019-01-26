import React from 'react';
import './pages.css';

const page1 = ( props ) => {
    return (
        <div className='page'>
            <h1>Welcome</h1>
            <button onClick={props.click}>Start</button>
        </div>
    )
}

export default page1;