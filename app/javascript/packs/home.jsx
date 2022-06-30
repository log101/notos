import './assets/app.css';
import { Player } from './components/player'
import { User } from './components/user'
import { Room } from './components/room'
import { Recordings } from "./components/recordings";

import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from 'react';

function App() {
    return (
        <div className="App">
            <Room />
            <User />
            <hr/>
            <Recordings />
            <hr/>
            <Player />
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById("home-container"))