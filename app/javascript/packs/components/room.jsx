import React from "react";
import { useState, useEffect } from 'react';

import roomService from '../services/room_service'

const RoomForm = (props) => {
    if (props.mode === "Show")
        return <button onClick={props.handleEditButton}>Change Room</button>
    else if (props.mode === "Edit") {
        return <form onSubmit={props.handleSubmitForm}>
            <input name="room_id" value={props.roomName} onChange={props.roomNameHandler} type="text"/>
            <input type="submit" value="Save"/>
        </form>
    }
}

const Room = (props) => {
    const [roomName, setRoomName] = useState("")
    const [mode, setMode] = useState("Show")
    const [alertText, setAlertText] = useState("")

    const textAlert = (alertText) => {
        setAlertText(alertText)
        setTimeout(() => {
            setAlertText("")
        }, 2000)
    }

    const handleEditButton = () => {
        setMode(old => {
            if (old === "Edit")
                return "Show"
            else if (old === "Show")
                return "Edit"
        })
    }

    const roomFormSubmitHandler = (event) => {
        event.preventDefault()
        roomService.updateRoom(roomName)
            .then(data => {
                if (data.alert !== null) {
                    textAlert(data.alert)
                } else if (data.room_id !== roomName) {
                    textAlert("Problem while setting the roomName!")
                } else {
                    textAlert("Successfully changed roomName!")
                }
                setRoomName(data.room_id)
                setMode("Show")
            })
    }

    const handleUsernameForm = (event) => {
        setRoomName(event.target.value)
    }


    useEffect(() => {
        roomService
            .getRoom()
            .then((data) => {
                setRoomName(data.room_id)
            })
    }, [])

    return <div>
        <p>{alertText}</p>
        <p>Room:</p>
        <p id="username-display">{roomName}</p>
        <RoomForm mode={mode}
                  roomName={roomName}
                  roomNameHandler={handleUsernameForm}
                  handleEditButton={handleEditButton}
                  handleSubmitForm={roomFormSubmitHandler} />
    </div>
}

export { Room }