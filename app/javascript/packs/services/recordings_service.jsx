import axios from 'axios';
const baseUrl = "https://127.0.0.1/recordings"

const getRecordings = (data) => {
    const req = axios.get(`${baseUrl}/index`)
    return req.then((res) => res.data)
}

const saveRecording = (data) => {
    const req = axios.put(`${baseUrl}/create`, {
        recording_data: data.recording_data,
    })
    return req.then((res) => res.data)
}

const deleteRecording = () => {}

export default { getRecordings, saveRecording, deleteRecording }