import api from "./producer-api.js";
import ProducerState from "./producer-state.js";

export default class Producer extends ProducerState {
  init() {
    this.setState(this.FETCHING_CONFIG);
    return api
      .getConfig()
      .then(res => {
        this.setState(this.INITIALIZED);
        return res;
      })
      .catch(e => {
        console.error("failed to init", this.getId());
        console.error(e);
        this.printState();
        return Promise.reject(e);
      });
  }

  send(data) {
    console.log("Producer#send data", data);
    this.setState(this.SENDING_EVENT);
    return api
      .postEvent(data)
      .then(res => {
        this.setState(this.RECEIVED_NEXT_BLOCK_NUMBER);
        return res;
      })
      .catch(e => {
        console.error(
          "failed to send event data",
          this.getId(),
          JSON.stringify(data)
        );
        console.error(e);
        this.printState();
        return Promise.reject(e);
      });
  }
}
