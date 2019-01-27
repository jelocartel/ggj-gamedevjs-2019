import React from 'react';
import "aframe";
import {Entity} from "aframe-react";

export default
function Map1() {
    return <Entity
        gltf-model="url(./map1.glb)"
        position={{x: 0, y: 0, z: 0}}/>
}
