// first, include axios (or similar database talker)
import { CancelToken } from 'axios'
import axios from "../bootstrap/Api";
import { CANCEL } from 'redux-saga'

// endpoint root
const root = "/contracts/disputes";
const votesUrl = "/votes";

export class Disputes {
  static list(payload) {

    const source = CancelToken.source()
    const request = axios.get(`${root}/all`, { params: payload, cancelToken: source.token });
    request[CANCEL] = () => source.cancel()
    return request
  }
  static get(payload) {
    return axios.get(`${root}/${payload.id}?include=attachments`);
  }
  static addMedia(payload) {
    return axios.post(`${root}/medias/${payload.id}`, payload); // attachments
  }
  static store(payload, id) {
    return axios.post(`${root}/${id}`, payload);
  }
  static update(payload, id) {
    payload.append("_method", "PUT");
    return axios.post(`${root}/${id}?include=attachments`, payload);
  }
  static delete(payload) {
    return axios.delete(`${root}/${payload.id}`);
  }
  static deleteAll() {
    const payload = new FormData();
    payload.append("type", "dispute");
    return axios.delete("/contracts/delete-all", payload);
  }
  static vote(payload) {
    return axios.post("votes", payload);
  }
  static deleteMedia(payload) {
    return axios.delete(`${root}/medias/${payload.id}`); // attachments delete
  }

  static filterVotesById({disputeId, winner}) {
    return axios.get(`${votesUrl}/filter/${disputeId}/${winner}`);
  }
}
