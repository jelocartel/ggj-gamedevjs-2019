import React from 'react';
import "aframe";
import {Entity} from "aframe-react";

import "../components/gamepad-control";
import "../components/keyboard-controls";
import "../components/car-audio";

const CAR1_DRIVING_MODEL = {
    acceleration: 100,
    easing: 3,
    turnSpeed: Math.PI,
};

const checkCollision = (evt) => {
    console.log('collision, ', evt)
    //evt.target is car !!
}

export default
function Car1({index, player}) {
    return <Entity
        class="car"
        aabb-collider="objects: .toCheckCollisions"
        key={index}
        gltf-model={`#model-car1${player}`}
        keyboard-controls={CAR1_DRIVING_MODEL}
        position={{x: 0 + index*4, y: 0, z: 0}}
        gamepad-controls={{controller: index, lookEnabled: false, ...CAR1_DRIVING_MODEL}}
        car-audio={{sound: 'sounds/car' + (index + 1) + '.mp3'}}
        events={{hitstart: checkCollision}} />;
}
