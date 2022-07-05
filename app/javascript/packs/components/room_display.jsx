import React from "react";

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

const RoomDisplay = (props) => {
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
        <p>Room:</p>
        <p id="room-display">{props.roomName}</p>
        <RoomForm mode={props.mode}
                  roomName={props.roomName}
                  roomNameHandler={handleUsernameForm}
                  handleEditButton={handleEditButton}
                  handleSubmitForm={props.updateFormHandler} />
    </div>
}

export { RoomDisplay }
