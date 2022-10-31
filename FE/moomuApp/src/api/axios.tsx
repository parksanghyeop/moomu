import axios from 'axios';
import * as AsyncStorage from '../utiles/AsyncService';

const instance = axios.create({
  baseURL: "/",
  // baseURL: "http://localhost:8080/",
  headers: {
    Authorization: 'Bearer ' + AsyncStorage.getData('token')!
  },  
});

export default instance;
