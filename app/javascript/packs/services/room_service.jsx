/*
 ROOM SERVICE
 Oda bilgisini almak için kullanılan servis
 Oda kullanıcıya otomatik olarak atanıyor ve session değişkeni olarak tutuluyor
 app/controllers/rooms_controller'a bknz.
*/

import axios from 'axios';
const baseUrl = "http://localhost:3000/room"

// Oda bilgisini getir
const getRoom = () => {
    const req = axios.get(`${baseUrl}/get`)
    return req.then((res) => res.data)
}

// Oda bilgisini güncelle
const updateRoom = (room) => {
    const request = axios.put(`${baseUrl}/set`, {room_id: room})
    return request.then((res) => res.data)
}

export default { getRoom, updateRoom }