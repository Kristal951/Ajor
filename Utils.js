import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.1.180:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

