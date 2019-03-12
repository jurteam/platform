// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

// endpoint root
const root = "/user";

export class User {
  static get() {
    return axios.get(root);
  }
  static create(payload) {
    return axios.post(root, payload);
  }
  static update(payload) {
    return axios.put(root, payload);
  }
  static delete() {
    return axios.delete(root);
  }
}
