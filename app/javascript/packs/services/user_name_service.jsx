/*
 USERNAME SERVICE
 Kullanıcı isminin çağırmak ve güncellemek için kullanılan servis
*/

import axios from 'axios';
const baseUrl = "http://localhost:3000/user"

// Kullanıcı ismini çağır
const getPerson = () => {
    const req = axios.get(`${baseUrl}/get`)
    return req.then((res) => res.data)
}

// Kullanıcı ismini güncelle
const updateUsername = (username) => {
    const request = axios.put(`${baseUrl}/set`, {user_id: username})
    return request.then((res) => res.data)
}

export default { getPerson, updateUsername }