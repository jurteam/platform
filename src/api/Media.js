// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

export class Media {
  static store(payload) {
    const { entity, id, attachments } = payload;
    return axios.post(`/${entity}/media/${id}`, { attachments });
  }
}
