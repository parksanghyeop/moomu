import axios from 'axios';
import * as AsyncStorage from '../utiles/AsyncService';

const instance = axios.create({
  baseURL: 'https://k7b202.p.ssafy.io/api/',
  // baseURL: "http://localhost:8000/",
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

export default instance;
