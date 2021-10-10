import axios from 'axios'

var instance = axios.create({
    baseURL: 'http://192.168.230.102:8086',
    timeout: 1000,
    withCredentials: true
});

export function fetchData(key) {
    return instance.get('/fetchData?key=' + key)
}

export function changeData() {
    return instance.post('/changeData')
}