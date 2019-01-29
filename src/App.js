import React, { Component } from "react";

import Page1 from './pages/welcome-page';
import Page2 from './pages/main-page';
import Page3 from './pages/game-page';

import "./App.css";

const PLAYER_COLORS = ["cyan", "magenta", "blue", "yellow"];

class App extends Component {

    state = {
        activePage: 1,
        playersCars: ["cyan"],
        results: []
    }
    myRef = React.createRef();

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
        arr[idx] = evt.target.value;
        this.setState( { playersCars: arr });
    }

    setResults = (arr) => {
        
        let res = arr.map((points, index) => {
            return {
                number: index,
                points: points
            }
        });
        res = res.sort( (a, b) => parseInt(b.points) - parseInt(a.points));
        let highscore = this.myRef.current;

        highscore.childNodes.forEach( (p, index) => {
            p.innerHTML = `player ${res[index].number} : ${res[index].points}`;
        });
    }

    render() {
        let content;

        if(this.state.activePage === 1) {
            return <Page1 click={this.nextPageHandler.bind(this, 2)}/>
        } else if (this.state.activePage === 2) {
            return <Page2
                        start={this.nextPageHandler.bind(this, 3)}
                        playersNumber={this.setNumberOfPlayersHandler}
                        players={this.state.playersCars}
                        setCar={this.setCarHandler}/>
        } else if (this.state.activePage === 3) {
            return (
                <div>
                    <div ref={this.myRef} className="highscore">
                        {new Array(this.state.playersCars.length).fill('1').map( (el, index) => {
                            return (
                                <p key={index}>player {index}</p>
                            )
                        })}
                    </div>
                    <Page3
                        players={this.state.playersCars}
                        setResults={this.setResults}/>
                </div>
            )
        }
        
    }
}

export default App;
