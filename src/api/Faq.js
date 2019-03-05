// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

// endpoint root
const root = "/faqs";

export class Faq {
  static get() {
    return axios.get(root);
  }
}
