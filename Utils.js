import axios from "axios";

export const API = axios.create({
  baseURL: "http://10.227.225.109:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

