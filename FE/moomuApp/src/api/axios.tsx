import axios from "axios";
import * as AsyncStorage from "../utiles/AsyncService";

const instance = axios.create({
  baseURL: "http://k7b202.p.ssafy.io:8000/",
  // baseURL: "http://localhost:8000/",
  headers: {
    Authorization: "Bearer " + AsyncStorage.getData("token"),
  },
});

export default instance;
