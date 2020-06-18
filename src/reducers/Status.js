import {
  STATUS_CHANGE_SHARE_NETWORK,
  STATUS_SHARE,
  SELECT_CHANGE_SHARE_TEXT
} from "./types";
import { SOCIAL_NETWORK_OPTIONS } from "../utils/StatusHelpers";

const INITIAL_STATE = {
  shareText:
    "I am a Status Holder in the Jur ecosystem to support the development of a truly decentralized ecosystem for a new legal framework",
  isSharing: false,
  shareNetwork: SOCIAL_NETWORK_OPTIONS[0]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATUS_CHANGE_SHARE_NETWORK:
      return { ...state, shareNetwork: action.payload };
    case SELECT_CHANGE_SHARE_TEXT:
      return { ...state, shareText: action.payload };
    case STATUS_SHARE:
      console.log("Status reducer share");
      return { ...state, isSharing: true };
    default:
      return state;
  }
};
