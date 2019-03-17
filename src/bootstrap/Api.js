import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    common: {
      wallet: null // init value of headers
    }
  }
});

// TODO: JWT authentication handler
