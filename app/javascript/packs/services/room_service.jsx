import axios from 'axios';
const baseUrl = "http://localhost:3000/room"

const getRoom = () => {
    const req = axios.get(`${baseUrl}/get`)
    return req.then((res) => res.data)
}

const updateRoom = (room) => {
    const request = axios.put(`${baseUrl}/set`, {room_id: room})
    return request.then((res) => res.data)
}

export default { getRoom, updateRoom }