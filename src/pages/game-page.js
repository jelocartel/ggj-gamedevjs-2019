import React from 'react';
import AFRAME from "aframe";
import {Scene, Entity} from "aframe-react";
import { Camera } from "../entities/camera";
import Car1 from "../entities/car1";

import CameraMovement from '../components/camera-movement';
import 'aframe-aabb-collider-component';

import './pages.css';

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
                
            {props.players.map( (player, index) =>
                <Car1 key={index} index={index} player={player}/>
            )}

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
