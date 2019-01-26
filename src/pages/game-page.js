import React from 'react';
import "aframe";
import {Scene, Entity} from "aframe-react";

import './pages.css';

const page3 = ( props ) => {
    return (
        <Scene>
            <Entity
                geometry={{primitive: "box"}}
                material={{color: "red"}}
                position={{x: 0, y: 0, z: -5}}/>
        </Scene>
    )
}

export default page3;