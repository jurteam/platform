// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

// endpoint root
const root = "/contracts";

export class Contracts {
  static list() {
    return axios.get(root);
  }
  static get(payload) {
    return axios.get(`${root}/${payload.id}`);
  }
  static create(payload) {
    return axios.post(root, payload);
  }
  static addMedia(payload) {
    return axios.post(`${root}/medias/${payload.id}`, payload); // attachments
  }
  static edit(payload) {
    return axios.put(`${root}/${payload.id}`, payload);
  }
  static delete(payload) {
    return axios.delete(`${root}/${payload.id}`);
  }
}
