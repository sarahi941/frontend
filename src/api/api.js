import axios from "axios";

const API = axios.create({
  baseURL: "https://cafeteria-escolar-5s55.onrender.com/api/",
  withCredentials: true,
});

export default API;