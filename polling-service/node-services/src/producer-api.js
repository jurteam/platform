import axios from "axios";

const api = axios.create({
  baseURL: process.env.PRODUCER_URL + "/polling-service/real-time",
  timeout: 15000,
  headers: { "X-Service": "rtr" }
});

const getConfig = () => api.get().then(r => r.data);
const postEvent = data => api.post(null, data).then(r => r.data);

export default {
  getConfig,
  postEvent
};
