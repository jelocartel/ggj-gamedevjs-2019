import React from 'react';
import "aframe";
import {Entity} from "aframe-react";

const Camera = (props) => {
    return (
        <Entity rotation={{ x: -30, y: 45, z: 0 }} position={{ x: 50, y: 50, z: 50 }}>
            <Entity camera="active: true; fov: 30" data-aframe-default-camera></Entity>
        </Entity>
    );
}

export {
    Camera
};
