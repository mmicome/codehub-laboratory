import axios from 'axios'

export function fetchData(key) {
    return axios.get('/fetchData?key=' + key)
}

export function changeData() {
    return axios.post('/changeData')
}