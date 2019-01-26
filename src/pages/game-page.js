import React from 'react';
import "aframe";
import {Scene, Entity} from "aframe-react";

import './pages.css';

const page3 = ( props ) => {
    return (
        <Scene>
            <a-assets>
                <a-asset-item id="model-car1" src="./car1.glb"></a-asset-item>
            </a-assets>

            <Entity
                gltf-model="#model-car1"
                position={{x: 0, y: 0, z: -5}}/>
        </Scene>
    )
}

export default page3;
