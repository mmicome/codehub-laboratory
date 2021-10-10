import axios from 'axios'

var instance = axios.create({
    baseURL: 'http://www.icome.cloud:8086',
    timeout: 1000,
    withCredentials: true
});

export function fetchData(key) {
    return instance.get('/fetchData?key=' + key)
}

export function changeData() {
    return instance.post('/changeData')
}