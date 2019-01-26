import React, { Component } from "react";
import "aframe";
import {Scene, Entity} from "aframe-react";

import "./App.css";

class App extends Component {
    render() {
        return <Scene>
            <Entity
                geometry={{primitive: "box"}}
                material={{color: "red"}}
                position={{x: 0, y: 0, z: -5}}/>
        </Scene>;
    }
}

export default App;
