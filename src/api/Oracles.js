// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

// endpoint root
const root = "/votes";

export class Oracles {
  static list(payload) {
    const { id, ...params } = payload;
    return axios.get(`${root}/${payload.id}`, { params });
  }
  static live(payload) {
    const { id, ...params } = payload;
    return axios.get(`${root}/live/${payload.id}`, { params });
    // return axios.get(`${root}/live/${payload.id}?live=${payload.created_at}`);
  }
  static get(payload) {
    return axios.get(`${root}/${payload.id}?include=attachments`);
  }
  static store(payload) {
    return axios.post(`${root}?include=attachments`, payload);
  }
  static deleteMedia(payload) {
    return axios.delete(`${root}/medias/${payload.id}`); // attachments delete
  }
}
