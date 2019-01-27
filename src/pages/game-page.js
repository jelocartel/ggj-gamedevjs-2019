import React from 'react';
import AFRAME from "aframe";
import {Scene, Entity} from "aframe-react";
import { Camera } from "../entities/camera";
import Car1 from "../entities/car1";
import Map1 from "../entities/map1";

// import CameraMovement from '../components/camera-movement';
import 'aframe-aabb-collider-component';

import './pages.css';

const page3 = ( props ) => {
    // AFRAME.registerComponent('camera-movement', CameraMovement);

    const carsWaypoints = {}
    props.players.forEach((element, index) => {
        carsWaypoints[index] = [];
    });
    
    let playersPoints = []
    props.players.forEach((element, index) => {
        playersPoints[index] = 0;
    });

    const checkCompletionTrackHandler = (waypoint, car) => {
        const waypointsChecked = carsWaypoints[car];
        if (waypoint === '1') {
            if (waypointsChecked.length === 3) {
                console.log(' full track !!!')
                playersPoints[car] = playersPoints[car] + 1
            }
            waypointsChecked.length = 0;
            waypointsChecked[0] = '1';
            carsWaypoints[car] = waypointsChecked;
        } 
        if (!waypointsChecked.includes(waypoint)) {
            waypointsChecked.push(waypoint);
            carsWaypoints[car] = waypointsChecked;
        }
        //handler to app to store points
        props.setResults(playersPoints);
    }

    return (
        <Scene>
            <a-assets>
                <a-asset-item id="model-car1blue" src="./car1blue.glb"></a-asset-item>
                <a-asset-item id="model-car1cyan" src="./car1cyan.glb"></a-asset-item>
                <a-asset-item id="model-car1magenta" src="./car1magenta.glb"></a-asset-item>
                <a-asset-item id="model-car1yellow" src="./car1yellow.glb"></a-asset-item>
            </a-assets>
            <Camera></Camera>

            <Map1/>
                
            {props.players.map( (player, index) =>
                <Car1 key={index} index={index} player={player} checkWaypoint={checkCompletionTrackHandler}/>
            )}

            <Entity
                class="waypoint"
                geometry={{
                    primitive: 'box',
                    height:"1",
                    width:"10",
                    depth:"1"
                }}
                material={{visible: false}}
                position={{x: 2.1, y: 0, z: 0.3}}
                scale={{x: 2.1, y: 1, z: 1}}
                id='waypoint_1'
            
                />
            <Entity
                class="waypoint"
                geometry={{
                    primitive: 'box',
                    height:"1",
                    width:"10",
                    depth:"1"
                }}
                material={{visible: false}}
                position={{x: 18, y: 0, z: -36}}
                rotation={{x: 90, y:90, z:0}}
                scale={{x: 2.2, y:1, z:1}}
                id='waypoint_2'
                />
            <Entity
                class="waypoint"
                geometry={{
                    primitive: 'box',
                    height:"1",
                    width:"10",
                    depth:"1"
                }}
                material={{visible: false}}
                position={{x: -50, y: 0, z: -30}}
                scale={{x: 3.6, y:1, z:1}}
                id='waypoint_3'
                />    
        </Scene>
    )
}

export default page3;
