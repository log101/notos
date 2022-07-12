import axios from 'axios';
const baseUrl = "http://127.0.0.1/user"

const getPerson = () => {
    const req = axios.get(`${baseUrl}/get`)
    return req.then((res) => res.data)
}

const updateUsername = (username) => {
    const request = axios.put(`${baseUrl}/set`, {user_id: username})
    return request.then((res) => res.data)
}

export default { getPerson, updateUsername }