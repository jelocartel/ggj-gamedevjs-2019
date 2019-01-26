import React from 'react';
import AFRAME from "aframe";
import {Scene, Entity} from "aframe-react";
import { Camera } from "../entities/camera";
import GamepadControls from "../components/gamepad-control";
import "../components/keyboard-controls";

import './pages.css';

const page3 = ( props ) => {
    AFRAME.registerComponent('gamepad-controls', GamepadControls);
    return (
        <Scene>
            <a-assets>
                <a-asset-item id="model-car1" src="./car1.glb"></a-asset-item>
                <a-asset-item id="model-map1" src="./map1.glb"></a-asset-item>
            </a-assets>
            <Camera></Camera>
            <Entity
                gltf-model="#model-map1"
                position={{x: 0, y: 0, z: 0}}/>
            {/* <Entity
                gltf-model="#model-car1"
                keyboard-controls={{acceleration: 100, easing: 3, turnSpeed: Math.PI}}
                position={{x: 0, y: 0, z: 0}}
                gamepad-controls={{controller: 0, lookEnabled: false, debug: true}}/> */}
                
            {props.players.map( (player, index) => {
                return (
                    // <Entity
                    //     key={index}
                    //     geometry={{primitive: "box"}}
                    //     material={{color: player}}
                    //     position={{x: 0, y: 0 + index*2, z: -5}}/>
                    <Entity
                        key={index}
                        gltf-model="#model-car1"
                        keyboard-controls={{acceleration: 100, easing: 3, turnSpeed: Math.PI}}
                        position={{x: 0 + index*4, y: 0, z: 0}}
                        gamepad-controls={{controller: index, lookEnabled: false, debug: true}}/>
                )
            })}
        </Scene>
    )
}

export default page3;
