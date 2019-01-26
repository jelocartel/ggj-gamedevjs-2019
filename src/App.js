import React, { Component } from "react";

import Page1 from './pages/welcome-page';
import Page2 from './pages/main-page';
import Page3 from './pages/game-page';

import "./App.css";

class App extends Component {

    state = {
        activePage: 3
    }

    nextPageHandler = (newActivePage) => {
        this.setState( { activePage: newActivePage } )
    }

    render() {
        let content;

        if(this.state.activePage === 1) {
            content = <Page1 click={this.nextPageHandler.bind(this, 2)}/>
        } else if (this.state.activePage === 2) {
            content = <Page2 click={this.nextPageHandler.bind(this, 3)}/>
        } else if (this.state.activePage === 3) {
            content = <Page3/>
        }
        return content
    }
}

export default App;
