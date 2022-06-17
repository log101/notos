import React from "react";
import { useState, useEffect } from 'react';

import usernameService from '../services/user_name_service'

const UserForm = (props) => {
    if (props.mode === "Show")
        return <button onClick={props.handleEditButton}>Edit</button>
    else if (props.mode === "Edit") {
        return <form onSubmit={props.handleSubmitForm}>
            <input name="user_id" value={props.username} onChange={props.usernameHandler} type="text"/>
            <input type="submit" value="Save"/>
        </form>
    }
}

const User = (props) => {
    const [username, setUserName] = useState("")
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

    const setUsername = (event) => {
        event.preventDefault()
        usernameService.updateUsername(username)
            .then(data => {
                if (data.user_id !== username) {
                    textAlert("Problem while setting the username!")
                } else {
                    textAlert("Successfully changed username!")
                }
                setUserName(data.user_id)
                setMode("Show")
            })
    }

    const handleUsernameForm = (event) => {
        setUserName(event.target.value)
    }


    useEffect(() => {
        usernameService
            .getPerson()
            .then((data) => {
                setUserName(data.user_id)
            })
    }, [])

    return <div>
        <p>{alertText}</p>
        <p>Username:</p>
        <p id="username-display">{username}</p>
        <UserForm mode={mode}
                  username={username}
                  usernameHandler={handleUsernameForm}
                  handleEditButton={handleEditButton}
                  handleSubmitForm={setUsername} />
    </div>
}

export { User }