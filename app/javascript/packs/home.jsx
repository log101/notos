import './assets/app.css';
import {Player} from './components/player'
import {Room} from "./components/room"

import React from "react";
import ReactDOM from "react-dom";

function App() {
    // Room -> Oda kontrollerini ve mesajları içeren bileşen
    // Player -> Sanal piyanoyu ve çalma kontrollerini içeren bileşen
    return (
        <div className="App">
            <Room/>
            <Player/>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById("home-container"))