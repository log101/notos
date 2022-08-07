/*
 Kayıtları kullanıcıya gösteren ve çalan bileşenler
*/
import React, {useEffect} from "react";
import { Howl } from 'howler';

import {notes} from "../assets/sounds/notes";


const PlayButton = (props) => {
    const recording = props.recording // Kullanıcının en son kaydettiği parça

    // Verilen notayı çal
    const play = (note) => {
        var sound = new Howl({
            src: notes[note]
        })
        sound.play()
    }

    // DOM zaman damgalarına göre notaları çal
    const handlePlayButton = (e) => {
        e.preventDefault()
        const baseTime = recording[0].timeStamp;
        recording.forEach(element => {
            setTimeout(() => {
                play(element.note)
            }, element.timeStamp - baseTime);
        });
    }

    return <a className="recording-play-button outline" href="#" role="button" onClick={handlePlayButton} style={{margin: "8px"}}>
        <hgroup>
            <h5>{props.user}</h5>
            <h6>{props.date.slice(5, 7) + "/" + props.date.slice(8, 10) + " ◦ " + props.date.slice(11, 16)}</h6>
        </hgroup>
        <div className="play-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-play-circle"
                 viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path
                    d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
            </svg>
        </div>
    </a>
}


// Odaya gönderilmiş ses parçalarını görüntüleyen bileşen
const Recordings = (props) => {
    // Ekranı aşağıya kaydır, en sonuncu kayda kadar
    useEffect(() => {
        setTimeout(() => {
            const container = document.getElementById("recordings-container")
            container.scrollTop = container.scrollHeight
        }, 500)
    }, [props.recordings])

    // Map fonksiyonuyla kayıtları divlere dönüştür ve görüntüle
    return <div id="recordings-container">
        {props.recordings.map(e => {
            return <div
                className="recording-container"
                style={props.username === e.user.name ?
                    {display: "flex", justifyContent: "end"} :
                    {display: "flex", justifyContent: "start"}}>
                <PlayButton currentUser={props.username} user={e.user.name} date={e.created_at} recording={e.data} />
            </div>
        })}
    </div>
}

export { Recordings }