import React from "react";
import { Howl } from 'howler';

import a4 from '../assets/sounds/A4.mp3'
import b4 from '../assets/sounds/B4.mp3'
import c4 from '../assets/sounds/C4.mp3'
import d4 from '../assets/sounds/D4.mp3'
import e4 from '../assets/sounds/E4.mp3'
import g3 from '../assets/sounds/G3.mp3'
import f3 from '../assets/sounds/F3.mp3'


const PlayButton = (props) => {
    const recording = props.recording

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

    const handlePlayButton = (e) => {
        const baseTime = recording[0].timeStamp;
        recording.forEach(element => {
            setTimeout(() => {
                play(element.note)
            }, element.timeStamp - baseTime);
        });
    }

    return <button onClick={handlePlayButton}>Play</button>
}

const Recordings = (props) => {

    return <div id="recordings-container">
        {props.recordings.map(e => <div>
            <p>Sent by {e.user.name} at {e.created_at}</p>
            <PlayButton recording={e.data} />
        </div>)}
    </div>
}

export { Recordings }