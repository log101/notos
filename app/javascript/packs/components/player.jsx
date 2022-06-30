import a4 from '../assets/sounds/A4.mp3'
import b4 from '../assets/sounds/B4.mp3'
import c4 from '../assets/sounds/C4.mp3'
import d4 from '../assets/sounds/D4.mp3'
import e4 from '../assets/sounds/E4.mp3'
import g3 from '../assets/sounds/G3.mp3'
import f3 from '../assets/sounds/F3.mp3'

import recordingsService from '../services/recordings_service'
import { Piano } from './piano'
import { Howl } from 'howler';
import React from "react";

import roomService from '../services/room_service'
import usernameService from '../services/user_name_service'

import { useState } from 'react';


const Player = (props) => {
    const notes = {
        'A4': a4,
        'B4': b4,
        'C4': c4,
        'D4': d4,
        'E4': e4,
        'F3': f3,
        'G3': g3,
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
            return <button onClick={props.handleSave}>Save</button>
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

    const handleSaveButton = (event) => {
        event.preventDefault()
        recordingsService.saveRecording(
            {
                recording_data: recording,
            }
        ).then(data => {
            setRecording([])
            setIsRecording(false)
            textAlert(data.alert)
        })
    }

    return <div>
        <p>{alertText}</p>
        <Piano handleClick={handlePianoClick} />
        <RecordButton handleClick={handleRecordButton} handleSave={handleSaveButton} />
        <button onClick={handlePlayButton}>Play</button>
        <button onClick={handleClearButton}>Clear</button>
    </div>
}

export { Player }