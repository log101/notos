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

const UserDisplay = (props) => {

    const handleEditButton = () => {
        props.modeSetter(old => {
            if (old === "Edit")
                return "Show"
            else if (old === "Show")
                return "Edit"
        })
    }

    const handleUsernameForm = (event) => {
        props.setter(event.target.value)
    }

    return <div>
        <p>Username:</p>
        <p id="username-display">{props.username}</p>
        <UserForm mode={props.mode}
                  username={props.username}
                  usernameHandler={handleUsernameForm}
                  handleEditButton={handleEditButton}
                  handleSubmitForm={props.updateFormHandler} />
    </div>
}

export { UserDisplay }