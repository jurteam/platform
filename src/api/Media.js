// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

export class Media {
  static delete(payload) {
    const { entity, id } = payload;

    return axios.delete(`/${entity}/media/${id}`);
  }
}
