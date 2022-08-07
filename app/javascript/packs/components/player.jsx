import recordingsService from '../services/recordings_service'
import {notes} from '../assets/sounds/notes'

import { Piano } from './piano'
import { Howl } from 'howler';

import React, {useEffect, useState} from "react";



// 10 saniyelik ilerleme çubuğu
const ProgressBar = (props) => {
    const [progress, setProgress] = useState(0) // İlerleme çubuğunun anlık değeri
    const [intervalId, setIntervalId] = useState() // Sayacın anlık değeri

    useEffect(() => {
        // Eğer kayıt başlamışsa 100ms'de bir ilerleme çubuğunu 1 arttır
        if (props.isRecording) {
            const progressInterval = setInterval(() => {
                setProgress(prev => prev + 1)
            }, 100)
            setIntervalId(progressInterval)
        } else {
            // Kayıt bittiyse ilerlemeyi sıfırla
            clearInterval(intervalId)
            setProgress(0)
        }
    }, [props.isRecording])

    useEffect(() => {
        // Eğer ilerleme çubuğu 100'e varmışsa ilerlemeyi ve kaydı durdur
        if (progress >= 100) {
            props.setIsRecording(false)
        }
    }, [progress])
    return <progress id="progress-bar" value={progress} max="100"/>
}


// Kayıtları çalan bileşen
const Player = (props) => {
    // Notalar assetlerin altında kayıtlı, notalar oradaki ses dosyalarına indeksleniyor
    // Alınan notayı sözlükte eşle ve ilgili notayı çal
    const play = (note) => {
        var sound = new Howl({
            src: notes[note]
        })
        sound.play()
    }

    const [recording, setRecording] = useState([])
    const [isRecording, setIsRecording] = useState(false)
    const [alertText, setAlertText] = useState("")

    // Eğer kayıt başlamışsa kaydı kaydedip bitiren, başlamamışsa kaydı başlatan buton
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

    // Kullanıcıya kayıt çaların üstünde 2 saniye süren uyarı ver
    const textAlert = (alertText) => {
        setAlertText(alertText)
        setTimeout(() => {
            setAlertText("")
        }, 2000)
    }


    const handleRecordButton = (e) => {
        e.preventDefault()
        // Kayıt ediliyor durumunu tersine çevir
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
            // Kayıtları alırkan DOM olayının zaman damgası da tutuluyor,
            // Bu kullanılarak ses aynı şekilde yeniden oynatılabiliyor
            recording.forEach(element => {
                setTimeout(() => {
                    play(element.note)
                }, element.timeStamp - baseTime);
            });
        }
    }

    // Kaydı temizle
    const handleClearButton = (e) => {
        e.preventDefault()
        setRecording([])
        textAlert("Recording deleted!")
    }

    // Piyano tuşlarını DOM zaman damgasıyla beraber kaydet
    const handlePianoClick = (e, note) => {
        if (isRecording) {
            const element = {}
            element.note = note
            element.timeStamp = e.timeStamp
            setRecording((old) => [...old, element])
        }
        play(note)
    }

    // Ses dosyasını kaydet
    // Kayıt başarılı olduysa kullanıcı uyar
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