import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_WEBSITE_NAME,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
