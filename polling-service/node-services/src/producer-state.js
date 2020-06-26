const STATES = {
  INITIALIZED: Symbol("INITIALIZED"),
  UNINITIALIZED: Symbol("UNINITIALIZED"),
  FETCHING_CONFIG: Symbol("FETCHING_CONFIG"),
  SENDING_EVENT: Symbol("SENDING_EVENT"),
  RECEIVED_NEXT_BLOCK_NUMBER: Symbol("RECEIVED_NEXT_BLOCK_NUMBER")
};

export default class ProducerState {
  constructor(baseId) {
    this.id = generateId(baseId);
    this.state = STATES.UNINITIALIZED;

    Object.assign(this, STATES);
  }

  getId() {
    return this.id;
  }

  setState(value) {
    this.state = value;
  }

  getState() {
    return this.state.toString();
  }

  printState() {
    console.log("current state of ", this.getId(), "is", this.getState());
  }
}

function generateId(baseId) {
  return "[producer-" + (baseId || new Date().toString()) + "-instance]";
}
