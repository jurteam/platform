import axios from "axios";

const api = axios.create({
  baseURL: process.env.PRODUCER_URL + "/polling-service",
  timeout: 15000,
  headers: { "X-Service": "rtr" }
});

const getConfig = () => api.get("/real-time").then(r => r.data);
const postEvent = data => api.post("/real-time", data).then(r => r.data);

export default {
  getConfig,
  postEvent
};
