import React from "react";

// Kullanıcı adı değiştirme formu
const UserForm = (props) => {
    if (props.mode === "Show")
        return <article id="user-display" hidden>
            <p style={{display: "inline"}} id="username-display">Username : {props.username}</p>
            <a style={{padding: "4px"}} onClick={props.handleEditButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </a>
        </article>
    else if (props.mode === "Edit") {
        return <article>
            <form onSubmit={props.handleSubmitForm}>
                <input name="user_id" value={props.username} onChange={props.usernameHandler} type="text"/>
                <input type="submit" value="Save"/>
            </form>
        </article>
    }
}

// Kullanıcı adını görüntüleyen bileşen
const UserDisplay = (props) => {
    // Edit butonuna basıldığında görüntüleme modunu değiştir
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

    return <UserForm mode={props.mode}
                  username={props.username}
                  usernameHandler={handleUsernameForm}
                  handleEditButton={handleEditButton}
                  handleSubmitForm={props.updateFormHandler} />
}

export { UserDisplay }