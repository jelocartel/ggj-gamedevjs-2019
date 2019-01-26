import React from 'react';
import "aframe";
import {Entity} from "aframe-react";

const Camera = (props) => {
    return (
        <Entity rotation={{ x: -30, y: 45, z: 0 }} position={{ x: 10, y: 10, z: 10 }}>
            <Entity camera="active: true" data-aframe-default-camera></Entity>
        </Entity>
    );
}

export {
    Camera
};
