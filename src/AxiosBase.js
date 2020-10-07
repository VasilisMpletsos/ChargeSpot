import axios from "axios";

const instance = axios.create({
  // http://35.176.175.106:5000/
  // http://localhost:5000/
  baseURL: "http://localhost:5000",
});

export default instance;
