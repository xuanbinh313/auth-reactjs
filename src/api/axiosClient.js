import axios from 'axios'

const AxiosClient = axios.create({
    baseURL: "http://localhost:8000/api",
})

AxiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default AxiosClient