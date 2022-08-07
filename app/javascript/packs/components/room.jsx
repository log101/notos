/*
 Oda numarasını görünteleyen ve değiştiren bileşen
*/
import React from "react";
import { useState, useEffect } from 'react';

import recordingService from '../services/recordings_service'
import roomService from '../services/room_service'
import usernameService from '../services/user_name_service'

import { Recordings } from "./recordings";
import { UserDisplay } from './user_display'
import { RoomDisplay } from './room_display'

import consumer from "../../channels/consumer";

const Room = (props) => {
    const [roomName, setRoomName] = useState("")
    const [username, setUserName] = useState("")
    const [alertText, setAlertText] = useState("")

    const [recordings, setRecordings] = useState([])

    const [roomDisplayMode, setRoomDisplayMode] = useState("Show")
    const [userDisplayMode, setUserDisplayMode] = useState("Show")


    // Kullanıcıya 2 saniyelik bildirimler göster
    const textAlert = (alertText) => {
        setAlertText(alertText)
        setTimeout(() => {
            setAlertText("")
        }, 2000)
    }

    // Oda numarasını güncelle
    const roomFormSubmitHandler = (event) => {
        event.preventDefault()
        // Kullanıcının girdiği değeri oda servisine gönder ve güncelle
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
                setRoomDisplayMode("Show")
                recordingService
                    .getRecordings()
                    .then((data) => {
                        setRecordings(data)
                    })
                // Oda numarası değiştiği için yeni bir websocket aboneliği oluştur
                consumer.subscriptions.create({channel: "ChatChannel", id: data.room_id},
                    {
                        received(data) {
                            setRecordings((old) => [...old, data])
                        }
                    })
            })
    }

    // Kullanıcı ismini güncelle
    const usernameFormSubmitHandler = (event) => {
        event.preventDefault()
        // Kullanıcı ismi servisine kullanıcı adını gönder ve güncelle
        usernameService.updateUsername(username)
            .then(data => {
                if (data.user_id !== username) {
                    textAlert("Problem while setting the username!")
                } else {
                    textAlert("Successfully changed username!")
                }
                setUserName(data.user_id)
                setUserDisplayMode("Show")
            })
    }

    // Uygulama açıldığında sırasıyla Oda -> Kullanıcı -> Kayıtlar servislerini çağır
    // Bu sırada olması gerekiyor çünkü son iki değişken Oda numarasına bağlı
    useEffect(() => {
        roomService
            .getRoom()
            .then((data) => {
                setRoomName(data.room_id)
                usernameService
                    .getPerson()
                    .then((data) => {
                        setUserName(data.user_id)
                    })
                recordingService
                    .getRecordings()
                    .then((data) => {
                        setRecordings(data)
                    })
                consumer.subscriptions.create({channel: "ChatChannel", id: data.room_id},
                    {
                        received(data) {
                            setRecordings((old) => [...old, data])
                        },
                        disconnected() {
                            window.location.reload() // Bağlantı kurulamadıysa sayfayı yenile
                        },
                    })
            })
    }, [])

    return <div>
        <p>{alertText}</p>
        <UserDisplay
            username={username}
            setter={setUserName}
            updateFormHandler={usernameFormSubmitHandler}
            mode={userDisplayMode}
            modeSetter={setUserDisplayMode}
        />
        <RoomDisplay
            roomName={roomName}
            setter={setRoomName}
            updateFormHandler={roomFormSubmitHandler}
            mode={roomDisplayMode}
            modeSetter={setRoomDisplayMode}
        />
        <hr/>
        <Recordings username={username} recordings={recordings} />
        <hr/>
    </div>
}

export { Room }