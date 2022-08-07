/*
 RECORDING SERVICE
 Ses kayıtlarını depolamak ve çağırmak için kullanılan servis
*/

import axios from 'axios';
const baseUrl = "http://localhost:3000/recordings"

// Sunucudan kayıtları al
const getRecordings = (data) => {
    const req = axios.get(`${baseUrl}/index`)
    return req.then((res) => res.data)
}

// Sunucuya kaydı yükle
const saveRecording = (data) => {
    const req = axios.put(`${baseUrl}/create`, {
        recording_data: data.recording_data,
    })
    return req.then((res) => res.data)
}

export default { getRecordings, saveRecording }