import axios from 'axios';
import store from '../store'

const httpClient = axios.create({
    baseURL: process.env.API_URL,
    timeout: process.env.API_TIMEOUT
});


httpClient.interceptors.request.use(function (config) {
    let token = store.getters.isToken
    if (token != null) {
        config.headers.Authorization = token;
    }
    return config;

}, function (error) {
    return Promise.reject(error);
});

export default httpClient;
