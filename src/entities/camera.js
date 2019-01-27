import React from 'react';
import "aframe";
import {Entity} from "aframe-react";

const Camera = (props) => {
    return (
        <Entity rotation={{ x: -30, y: 45, z: 0 }} position={{ x: 60, y: 60, z: 60 }} {...props}>
            <Entity camera="active: true; fov: 30" data-aframe-default-camera></Entity>
        </Entity>
    );
}

export {
    Camera
};
