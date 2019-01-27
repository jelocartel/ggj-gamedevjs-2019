import React from 'react';
import AFRAME from "aframe";
import {Scene, Entity} from "aframe-react";
import { Camera } from "../entities/camera";
import CameraMovement from '../components/camera-movement';
import "../components/gamepad-control";
import "../components/keyboard-controls";
import "../components/car-audio";
import 'aframe-aabb-collider-component';

import './pages.css';

const CAR1_DRIVING_MODEL = {
    acceleration: 100,
    easing: 3,
    turnSpeed: Math.PI,
};

const checkCollision = (evt) => {
    console.log('collision, ', evt)
    //evt.target is car !!
}

const page3 = ( props ) => {
    AFRAME.registerComponent('camera-movement', CameraMovement);
    return (
        <Scene>
            <a-assets>
                <a-asset-item id="model-car1blue" src="./car1blue.glb"></a-asset-item>
                <a-asset-item id="model-car1cyan" src="./car1cyan.glb"></a-asset-item>
                <a-asset-item id="model-car1magenta" src="./car1magenta.glb"></a-asset-item>
                <a-asset-item id="model-car1yellow" src="./car1yellow.glb"></a-asset-item>
                <a-asset-item id="model-map1" src="./map2.glb"></a-asset-item>
            </a-assets>
            <Camera></Camera>

            <Entity
                gltf-model="#model-map1"
                position={{x: 0, y: 0, z: 0}}/>
                
            {props.players.map( (player, index) => {
                return <Entity
                    class="car"
                    aabb-collider="objects: .toCheckCollisions"
                    key={index}
                    gltf-model={`#model-car1${player}`}
                    keyboard-controls={CAR1_DRIVING_MODEL}
                    position={{x: 0 + index*4, y: 0, z: 0}}
                    gamepad-controls={{controller: index, lookEnabled: false, ...CAR1_DRIVING_MODEL}}
                    car-audio
                    events={{hitstart: checkCollision}} />;
            })}

            <Entity
                class="toCheckCollisions"
                geometry={{primitive: 'box'}}
                material={{color: 'red'}}
                position={{x: 0, y: 0, z: 0}}
                />
        </Scene>
    )
}

export default page3;
