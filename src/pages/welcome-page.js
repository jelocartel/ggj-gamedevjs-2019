import React from 'react';
import {Scene, Entity} from "aframe-react";

import './pages.css';

const page1 = ( props ) => {
    return (
        <div>
            <h1>Samochodziki i małe robociki</h1>
            <Scene>
                <a-assets>
                    <a-asset-item id="model-car1blue" src="./car1blue.glb"></a-asset-item>
                </a-assets>
                    <Entity position={{x: 6.88, y: 0.96, z: -6.7}}
                    rotation={{x: 3.5, y: 128.5, z: 0}}>
                        <Entity camera="active: true; fov: 30" data-aframe-default-camera near="0.001"></Entity>
                    </Entity>
                <Entity
                    gltf-model="#model-car1blue"
                    position={{x: 0, y: 0, z: 0}}/>
            </Scene>
            <button onClick={props.click}>Start</button>
        </div>
    )
}

export default page1;