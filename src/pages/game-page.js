import React from 'react';
import AFRAME from "aframe";
import {Scene, Entity} from "aframe-react";
import { Camera } from "../entities/camera";
import Car1 from "../entities/car1";
import Map1 from "../entities/map1";

import CameraMovement from '../components/camera-movement';
import 'aframe-aabb-collider-component';
import 'aframe-physics-system';

import './pages.css';

const page3 = ( props ) => {
    AFRAME.registerComponent('camera-movement', CameraMovement);
    return (
        <Scene physics="debug: true; friction: 0.1">
            <a-assets>
                <a-asset-item id="model-car1blue" src="./car1blue.glb"></a-asset-item>
                <a-asset-item id="model-car1cyan" src="./car1cyan.glb"></a-asset-item>
                <a-asset-item id="model-car1magenta" src="./car1magenta.glb"></a-asset-item>
                <a-asset-item id="model-car1yellow" src="./car1yellow.glb"></a-asset-item>
                <a-asset-item id="model-pencil" src="./pencil.glb"></a-asset-item>
            </a-assets>
            <Camera></Camera>

            <Map1/>
                
            {props.players.map( (player, index) =>
                <Car1 key={index} index={index} player={player}/>
            )}
        </Scene>
    )
}

export default page3;
