import React from 'react';
import "aframe";
import {Entity} from "aframe-react";

const Camera = (props) => {
    return (
        <Entity rotation={{ x: -30, y: 45, z: 0 }} position={{ x: 120, y: 120, z: 120 }} camera-movment {...props}>
            <Entity camera="active: true; fov: 30" data-aframe-default-camera near="0.001"></Entity>
        </Entity>
    );
}

export {
    Camera
};
