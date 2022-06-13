import './assets/app.css';
import a3 from './assets/sounds/Piano.pp.A3.mp3'
import b3 from './assets/sounds/Piano.mf.B3.mp3'
import c4 from './assets/sounds/Piano.mf.C4.mp3'
import d4 from './assets/sounds/Piano.mf.D4.mp3'
import e4 from './assets/sounds/Piano.ff.E4.mp3'
import g4 from './assets/sounds/Piano.ff.G4.mp3'
import f4 from './assets/sounds/Piano.ff.F4.mp3'


import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from 'react';
import { Howl } from 'howler';

const notes = {
    'A3': a3,
    'B3': b3,
    'C4': c4,
    'D4': d4,
    'E4': e4,
    'F4': f4,
    'G4': g4,
}


function play(note) {
    var sound = new Howl({
        src: notes[note]
    })

    sound.play()
}


function App() {
    const [recording, setRecording] = useState([])
    const [isRecording, setIsRecording] = useState(false)
    const [messages, setMessages] = useState([])

    const RecordButton = (props) => {
        const text = isRecording ? <span>Recording</span> : <span>Record</span>
        return <button onClick={handleRecordButton}>{text}</button>
    }
    const PlayButton = (props) => {
        return <button onClick={playRecording}>Play</button>
    }

    const ClearButton = (props) => {
        return <button className="clear-button" onClick={() => setRecording([])}>Clear</button>
    }

    const Messages = (props) => {
        return <div>
            {messages.map((recording, index) =>
                <button key={index}
                        onClick={() => playRecordingS(recording)}>Play track {index}
                </button>)}
        </div>
    }

    const playRecordingS = (recording) => {
        const baseTime = recording[0].timeStamp;
        recording.forEach(element => {
            setTimeout(() => {
                handleKeyDown(element)
            }, element.timeStamp - baseTime);
        });
    }

    const playRecording = () => {
        const baseTime = recording[0].timeStamp;
        recording.forEach(element => {
            setTimeout(() => {
                handleKeyDown(element)
            }, element.timeStamp - baseTime);
        });
    }

    const recordStrokes = (e) => {
        if (isRecording) {
            console.log("stroke recording");
            const note = new Object()
            note.key = e.key
            note.timeStamp = e.timeStamp
            setRecording((old) => [...old, note])
        }
    }

    const handleRecordButton = (e) => {
        if (isRecording) {
            setMessages((oldRecordings) => [...oldRecordings, recording])
            setRecording([])
        }
        setIsRecording((old) => !old);
    }

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'a':
                play('B3');
                break;
            case 's':
                play('A3');
                break;
            case 'd':
                play('G4')
                break;
            case 'f':
                play('F4')
                break;
            case 'g':
                play('E4')
                break;
            case 'h':
                play('D4')
                break;
            case 'j':
                play('C4')
                break;
        }
        recordStrokes(e);
    }


    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        };
    })

    return (
        <div className="App">
            <Messages messages={messages}/>
            <hr/>
            <ul className="set">
                <li className="bar white b" onClick={(event) => {
                    event.key = 'a'
                    recordStrokes(event);
                    play('B3')
                }}></li>
                <li className="bar black as"></li>
                <li className="bar white a" id="a" onClick={(event) => {
                    event.key = 's'
                    recordStrokes(event);
                    play('A3')
                }}></li>
                <li className="bar black gs"></li>
                <li className="bar white g" onClick={(event) => {
                    event.key = 'd'
                    recordStrokes(event);
                    play('G4')
                }}></li>
                <li className="bar black fs" ></li>
                <li className="bar white f" onClick={(event) => {
                    event.key = 'f'
                    recordStrokes(event);
                    play('F4')
                }}></li>
                <li className="bar white e" onClick={(event) => {
                    event.key = 'g'
                    recordStrokes(event);
                    play('E4')
                }}></li>
                <li className="bar black ds"></li>
                <li className="bar white d" onClick={(event) => {
                    event.key = 'h'
                    recordStrokes(event);
                    play('D4')
                }}></li>
                <li className="bar black cs"></li>
                <li className="bar white c" onClick={(event) => {
                    event.key = 'j'
                    recordStrokes(event);
                    play('C4')
                }}></li>
            </ul>
            <RecordButton />
            <PlayButton recording={recording} />
            <ClearButton />
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById("home-container"))