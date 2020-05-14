
import axios from "../bootstrap/Api";


// endpoint root
const root = "/transactions";

export class Transactions {
  static list() {
    return axios.get(root)
  }
  static create(payload) {
    return axios.post(root, payload);
  }
  static lock(id) {
    return axios.put(`${root}/${id}/lock`);
  }
  static unlock(id) {
    return axios.put(`${root}/${id}/unlock`);
  }
  static update(payload, id) {
    return axios.put(`${root}/${id}`, payload);
  }
  static delete(id) {
    return axios.delete(`${root}/${id}`);
  }
}
