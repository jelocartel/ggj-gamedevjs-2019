import React from 'react';
import AFRAME from "aframe";
import {Scene, Entity} from "aframe-react";
import { Camera } from "../entities/camera";
import GamepadControls from "../components/gamepad-control";
import CameraMovement from '../components/camera-movement';

import "../components/keyboard-controls";

import './pages.css';

const page3 = ( props ) => {
    AFRAME.registerComponent('camera-movement', CameraMovement);
    AFRAME.registerComponent('gamepad-controls', GamepadControls);
    return (
        <Scene>
            <a-assets>
                <a-asset-item id="model-car1blue" src="./car1blue.glb"></a-asset-item>
                <a-asset-item id="model-car1cyan" src="./car1cyan.glb"></a-asset-item>
                <a-asset-item id="model-car1magenta" src="./car1magenta.glb"></a-asset-item>
                <a-asset-item id="model-car1yellow" src="./car1yellow.glb"></a-asset-item>
                <a-asset-item id="model-map1" src="./map1.glb"></a-asset-item>
            </a-assets>
            <Camera camera-movement></Camera>
            <Entity
                gltf-model="#model-map1"
                position={{x: 0, y: 0, z: 0}}/>

            {props.players.map( (player, index) => {
                return index === 0 ?
                <Entity
                    key={index}
                    gltf-model={`#model-car1${player}`}
                    className="car"
                    keyboard-controls={{acceleration: 100, easing: 3, turnSpeed: Math.PI}}
                    position={{x: 0 + index*4, y: 0, z: 0}}
                    gamepad-controls={{controller: index, lookEnabled: false, debug: true}}/> :
                    <Entity
                        key={index}
                        gltf-model={`#model-car1${player}`}
                        className="car"
                        position={{ x: 0 + index * 4, y: 0, z: 0 }}
                        gamepad-controls={{ controller: index, lookEnabled: false, debug: true }} />;
            })}
        </Scene>
    )
}

export default page3;
