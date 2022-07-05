import './assets/app.css';
import { Player } from './components/player'
import { UserDisplay } from './components/user_display'
import { RoomDisplay } from './components/room_display'
import { Recordings } from "./components/recordings";
import { Room } from "./components/room"

import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from 'react';

function App() {

    return (
        <div className="App">
            <Room />
            <Player />
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById("home-container"))