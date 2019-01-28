import React from 'react';
import "aframe";
import 'aframe-physics-system';
import {Entity} from "aframe-react";

import "../components/gamepad-control";
import "../components/keyboard-controls";
import "../components/car-audio";

const CAR1_DRIVING_MODEL = {
    acceleration: 100,
    easing: 3,
    turnSpeed: Math.PI,
};

export default
function Car1({index, player, checkWaypoint}) {
    const checkCollision = (evt) => {
        let waypoint = evt.detail.el.id.split('_')[1];
        let car = evt.target.id;
        checkWaypoint(waypoint, car)
    }

    return <Entity
        id={`car${index}`}
        class="car"
        aabb-collider="objects: .waypoint"
        dynamic-body={{
            shape: "box",
            mass: 5,
            linearDamping: 0.1,
            angularDamping: 0.1,
        }}
        key={index}
        gltf-model={`#model-car1${player}`}
        keyboard-controls={CAR1_DRIVING_MODEL}
        position={{x: 0 + index*4, y: 0, z: 0}}
        gamepad-controls={{controller: index, lookEnabled: false, ...CAR1_DRIVING_MODEL}}
        car-audio={{sound: 'sounds/car' + (index + 1) + '.mp3'}}
        events={{hitclosest: checkCollision}}
        id={index} />;
}
