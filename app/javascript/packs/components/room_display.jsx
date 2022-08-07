import React, {useState} from "react";

// Oda değiştirme formu
const RoomForm = (props) => {
    const [showInfo, setShowInfo] = useState(false)

    // Formu gizle/göster
    const toggleInfo = () => {
        setShowInfo(old => !old)
    }

    if (props.mode === "Show")
        return <article>,
            <p style={{display: "inline", paddingRight: "8px"}} id="room-display">
                {props.roomName.toString().slice(0, 4) + " - " + props.roomName.toString().slice(4, 8) + " - " + props.roomName.toString().slice(8, 12) + " - " + props.roomName.toString().slice(12, 16)}
            </p>
            <a style={{padding: "4px"}} onClick={props.handleEditButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </a>
            <a style={{padding: "4px"}} onClick={toggleInfo}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path
                        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
            </a>
            {showInfo && <footer>
                Share this number with your friends
            </footer>}
        </article>
    else if (props.mode === "Edit") {
        return <article>
            <form name="submitForm" onSubmit={props.handleSubmitForm}>
                <input name="room_id" value={props.roomName} onChange={props.roomNameHandler} type="text"/>
                <input type="submit" value="Save"/>
            </form>
        </article>
    }
}

// Oda numarasını görüntüleyen bileşen
const RoomDisplay = (props) => {
    // Edit butonuna basıldığında görüntüleme modunu değiştir
    // "Edit" olduğunda form gösteriliyor
    // "Show" olduğunda oda numarası
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
        <RoomForm mode={props.mode}
                  roomName={props.roomName}
                  roomNameHandler={handleUsernameForm}
                  handleEditButton={handleEditButton}
                  handleSubmitForm={props.updateFormHandler}/>
    </div>
}

export {RoomDisplay}
