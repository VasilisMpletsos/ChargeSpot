import axios from "axios";

const instance = axios.create({
  baseURL: "http://35.176.175.106:5000/",
});

export default instance;
