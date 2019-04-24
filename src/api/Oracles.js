// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

// endpoint root
const root = "/votes";

export class Oracles {
  // static list(payload) {
  //   return axios.get(`${root}/all`, { params: payload });
  // }
  static get(payload) {
    return axios.get(`${root}/${payload.id}`);
  }
  static store(payload) {
    return axios.post(`${root}?include=attachments`, payload);
  }
  static deleteMedia(payload) {
    return axios.delete(`${root}/medias/${payload.id}`); // attachments delete
  }
}
