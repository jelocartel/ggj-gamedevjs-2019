import React from 'react';
import "aframe";
import { Scene, Entity } from "aframe-react";

const Camera = (props) => {
    return (
        <Entity rotation={{ x: -90, y: -90, z: 0 }} position={{ x: 0, y: 20, z: 0 }}>
            <Entity camera="active: true" data-aframe-default-camera>
            </Entity>
        </Entity>

    )
}

export {
    Camera
};
