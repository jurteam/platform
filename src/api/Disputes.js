// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

// endpoint root
const root = "/disputes";

export class Disputes {
  static list(payload) {
    return axios.get("/contracts/disputes/all", { params: payload });
  }
  static get(payload) {
    return axios.get(`${root}/${payload.id}`, {
      params: {
        include: "attachments,details"
      }
    });
  }
  static addMedia(payload) {
    return axios.post(`${root}/medias/${payload.id}`, payload); // attachments
  }
  static update(payload, id) {
    payload.append("_method", "PUT");
    return axios.post(`${root}/${id}?include=attachments`, payload);
  }
  static delete(payload) {
    return axios.delete(`${root}/${payload.id}`);
  }
  static deleteMedia(payload) {
    return axios.delete(`${root}/medias/${payload.id}`); // attachments delete
  }
}
