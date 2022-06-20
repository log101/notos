import './assets/app.css';
import { Player } from './components/player'
import { User } from './components/user'
import { Room } from './components/room'

import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from 'react';

function App() {
    return (
        <div className="App">
            <Room />
            <User />
            <Player />
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById("home-container"))