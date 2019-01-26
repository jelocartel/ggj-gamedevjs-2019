import React, { Component } from "react";

import Page1 from './pages/welcome-page';
import Page2 from './pages/main-page';
import Page3 from './pages/game-page';

import "./App.css";

const PLAYER_COLORS = ["cyan", "magenta", "blue", "yellow"];

class App extends Component {

    state = {
        activePage: 1,
        playersCars: ["cyan"]
    }

    nextPageHandler = (newActivePage) => {
        this.setState( { activePage: newActivePage } );
    }

    setNumberOfPlayersHandler = (evt) => {
        let numberOfPlayers = parseInt(evt.target.value);
        this.setState( { 
            playersCars: PLAYER_COLORS.slice(0, numberOfPlayers)
        } );
    }

    setCarHandler = (idx, evt) => {
        let arr = this.state.playersCars;
        // arr.push(evt.target.value);
        arr[idx] = evt.target.value;
        this.setState( { playersCars: arr });
        console.log('players cars = ', this.state.playersCars)
    }

    render() {
        let content;

        if(this.state.activePage === 1) {
            content = <Page1 click={this.nextPageHandler.bind(this, 2)}/>
        } else if (this.state.activePage === 2) {
            content = <Page2 
                        start={this.nextPageHandler.bind(this, 3)}
                        playersNumber={this.setNumberOfPlayersHandler}
                        players={this.state.playersCars}
                        setCar={this.setCarHandler}/>
        } else if (this.state.activePage === 3) {
            content = <Page3
                        players={this.state.playersCars}/>
        }
        return content
    }
}

export default App;
