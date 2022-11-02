import axios from 'axios';
import * as AsyncStorage from '../utiles/AsyncService';

const instance = axios.create({
  baseURL: "https://k7b202.p.ssafy.io/api/",
  // baseURL: "http://localhost:8000/",
  headers: {
    Authorization: 'Bearer ' + AsyncStorage.getData('token')!
  },  
});

export default instance;
