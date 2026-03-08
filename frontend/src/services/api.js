import axios from "axios";

const API = axios.create({
   baseURL: "https://daily-tracker-5c52.onrender.com/api",
   //baseURL: "http://localhost:5000/api"
});

export default API;
