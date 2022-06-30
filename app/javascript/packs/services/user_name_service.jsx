import axios from 'axios';
const baseUrl = "http://localhost:3000/user"

import room_service from "./room_service";

const getPerson = () => {
    return room_service.getRoom().then(data => {
        const req = axios.get(`${baseUrl}/get`)
        return req.then((res) => res.data)
    }) // Should get room first to save user to db
}

const updateUsername = (username) => {
    const request = axios.put(`${baseUrl}/set`, {user_id: username})
    return request.then((res) => res.data)
}

export default { getPerson, updateUsername }