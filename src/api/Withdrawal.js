// first, include axios (or similar database talker)
import { CancelToken } from 'axios'
import axios from "../bootstrap/Api";
import { CANCEL } from 'redux-saga'

// endpoint root
const root = "/contracts/withdrawal";

export class Withdrawal {

  static store(payload, id) {
    return axios.post(`${root}/${id}`, payload);
  }
  
}
