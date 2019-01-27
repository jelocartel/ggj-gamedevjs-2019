import React from 'react';
import "aframe";
import 'aframe-physics-system';
import {Entity} from "aframe-react";

export default
function Map1() {
    return <Entity>
        <Entity
            geometry={{primitive: "box"}}
            scale={{x: 100, y: 1, z: 100}}
            position={{x: 0, y: -1, z: 0}}
            static-body={{
                shape: "box",
            }}
        />

        <Entity
            gltf-model="url(./map1.glb)"
            position={{x: 0, y: 0, z: 0}}
        />

    </Entity>;

}
