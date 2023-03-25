import axios from "axios";
const API = axios.create({
  baseURL: "http://192.168.1.10:8000/deliveryo",
});

export default API;
