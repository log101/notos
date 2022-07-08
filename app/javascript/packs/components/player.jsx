import recordingsService from '../services/recordings_service'
import { Piano } from './piano'
import { Howl } from 'howler';
import React, {useEffect} from "react";
import { useState } from 'react';

import note from '../assets/sounds/notes'

let progressInterval;

const ProgressBar = (props) => {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        if (props.isRecording) {
            progressInterval = setInterval(() => {
                setProgress(prev => prev + 1)
            }, 100)
        } else {
            clearInterval(progressInterval)
            setProgress(0)
        }
    }, [props.isRecording])

    useEffect(() => {
        if (progress >= 100) {
            props.setIsRecording(false)
        }
    }, [progress])
    return <progress id="progress-bar" value={progress} max="100"/>
}


const Player = (props) => {
    const notes = {
        "1C": note.c261,
        "1Cs": note.c277,
        "1D": note.d293,
        "1Ds": note.d311,
        "1E": note.e329,
        "1F": note.f349,
        "1Fs": note.f369,
        "1G": note.g391,
        "1Gs": note.g415,
        "2A": note.a440,
        "2As": note.a466,
        "2B": note.b495,
        "2C": note.c523,
        "2Cs": note.c545,
        "2D": note.d587,
        "2Ds":note.d622,
        "2E": note.e659,
        "2F": note.f698,
        "2Fs": note.f698s,
        "2G": note.g783,
        "2Gs": note.g830,
        "3A": note.a880,
        "3As": note.a932,
        "3B": note.b987,
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
            return <a className="player-button" href="#" role="button" onClick={props.handleClick}>Record</a>
        else if (isRecording === false && recording.length !== 0)
            return <a className="player-button" href="#" role="button" onClick={props.handleSave}>Save</a>
        else if (isRecording)
            return <a className="player-button" href="#" role="button" onClick={props.handleClick}>Recording</a>
        else
            return <a className="player-button" href="#" role="button" onClick={props.handleClick}>Record</a>
    }

    const textAlert = (alertText) => {
        setAlertText(alertText)
        setTimeout(() => {
            setAlertText("")
        }, 2000)
    }


    const handleRecordButton = (e) => {
        e.preventDefault()
        setIsRecording((old) => !old)
    }

    const handlePlayButton = (e) => {
        e.preventDefault()
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
        e.preventDefault()
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
        <ProgressBar setIsRecording={setIsRecording} isRecording={isRecording} />
        <RecordButton handleClick={handleRecordButton} handleSave={handleSaveButton} />
        <a className="player-button" href="#" role="button" onClick={handlePlayButton}>Play</a>
        <a className="player-button" href="#" role="button" onClick={handleClearButton}>Clear</a>
    </div>
}

export { Player }