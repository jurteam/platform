// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

// endpoint root
const root = "/user";

export class User {
  static get() {
    const { API } = global;
    if (typeof API !== "undefined" && API.defaults.headers.common["wallet"]) {
      return axios.get(root);
    }
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

  static acceptDisclaimer() {
    return axios.put(root + "/disclaimer", { accepted_disclaimer: true });
  }

  static getActivities(payload) {
    const { API } = global;
    if (typeof API !== "undefined" && API.defaults.headers.common["wallet"]) {
      return axios.get(
        `${root}/activities?byDate&orderBy=${payload.orderBy}&perPage=${
          process.env.REACT_APP_PER_PAGE_NOTIFICATIONS
        }`
      );
    }
  }
}
