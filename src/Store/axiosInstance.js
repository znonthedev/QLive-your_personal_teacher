import axios from "axios";

// const BASIC_URL = "http://192.168.43.209:8000";

const BASIC_URL = "https://tcsapi.qlivelearn.in/";


export const axiosApi = axios.create({
  baseURL: BASIC_URL,
  timeout: 9000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("qlive_token");
  if (token) {
    config.headers["Authorization"] = "token " + token;
  } else {
    console.log("error");
  }
  return config;
});
