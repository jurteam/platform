// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

// endpoint root
const root = "/contracts";

export class Contracts {
  static list(payload) {
    return axios.get(root, { params: payload });
  }
  static get(payload) {
    return axios.get(`${root}/${payload.id}`, {
      params: {
        include: "attachments,details"
      }
    });
  }
  static create(payload) {
    return axios.post(root, payload);
  }
  static addMedia(payload) {
    return axios.post(`${root}/medias/${payload.id}`, payload); // attachments
  }
  static update(payload, id) {
    return axios.put(`${root}/${id}`, payload);
  }
  static delete(payload) {
    return axios.delete(`${root}/${payload.id}`);
  }
}
