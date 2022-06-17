import a3 from '../assets/sounds/Piano.pp.A3.mp3'
import b3 from '../assets/sounds/Piano.mf.B3.mp3'
import c4 from '../assets/sounds/Piano.mf.C4.mp3'
import d4 from '../assets/sounds/Piano.mf.D4.mp3'
import e4 from '../assets/sounds/Piano.ff.E4.mp3'
import g4 from '../assets/sounds/Piano.ff.G4.mp3'
import f4 from '../assets/sounds/Piano.ff.F4.mp3'

import { Piano } from './piano'
import { Howl } from 'howler';
import React from "react";

import { useState } from 'react';


const Player = (props) => {
    const notes = {
        'A3': a3,
        'B3': b3,
        'C4': c4,
        'D4': d4,
        'E4': e4,
        'F4': f4,
        'G4': g4,
    }

    const play = (note) => {
        var sound = new Howl({
            src: notes[note]
        })
        sound.play()
    }


    const [recording, setRecording] = useState([])
    const [isRecording, setIsRecording] = useState(false)
    const [alertText, setAlertText] = useState("")

    const RecordButton = (props) => {
        if (isRecording === false && recording.length === 0)
            return <button onClick={props.handleClick}>Record</button>
        else if (isRecording === false && recording.length !== 0)
            return <button onClick={props.handleClick}>Save</button>
        else if (isRecording)
            return <button onClick={props.handleClick}>Recording</button>
        else
            return <button onClick={props.handleClick}>Record</button>
    }

    const textAlert = (alertText) => {
        setAlertText(alertText)
        setTimeout(() => {
            setAlertText("")
        }, 2000)
    }

    const handleRecordButton = (e) => {
        setIsRecording((old) => !old)
    }

    const handlePlayButton = (e) => {
        if (isRecording)
            textAlert("You're still recording!")
        else if (recording.length === 0)
            textAlert("You haven't recorded anything yet!")
        else {
            const baseTime = recording[0].timeStamp;
            recording.forEach(element => {
                setTimeout(() => {
                    play(element.note)
                }, element.timeStamp - baseTime);
            });
        }
    }

    const handleClearButton = (e) => {
        setRecording([])
        textAlert("Recording deleted!")
    }

    const handlePianoClick = (e, note) => {
        if (isRecording) {
            const element = {}
            element.note = note
            element.timeStamp = e.timeStamp
            setRecording((old) => [...old, element])
        }
        play(note)
    }

    return <div>
        <p>{alertText}</p>
        <Piano handleClick={handlePianoClick} />
        <RecordButton handleClick={handleRecordButton} />
        <button onClick={handlePlayButton}>Play</button>
        <button onClick={handleClearButton}>Clear</button>
    </div>
}

export { Player }