import axios from 'axios';
import * as AsyncStorage from '../utiles/AsyncService';
import * as RootNavigation from '../../RootNavigation';

const instance = axios.create({
    baseURL: 'https://k7b202.p.ssafy.io/api/',
    // baseURL: "http://localhost:8000/",
    headers: { 'Content-Type': `application/json` },
});

instance.interceptors.request.use(
    async (config: any) => {
        const token = await AsyncStorage.getData('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    RootNavigation.resetDefault('Start');
                    break;
                case 451:
                    RootNavigation.resetDefault('Start');
                    break;
                default:
                    return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
