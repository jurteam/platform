import {
  STATUS_CHANGE_SHARE_NETWORK,
  STATUS_SHARE,
  STATUS_CHANGE_SHARE_TEXT,
  STATUS_FETCH_MINE,
  STATUS_UPDATE_MINE,
  STATUS_FETCH_HOLDERS,
  STATUS_UPDATE_HOLDERS
} from "./types";
import { SOCIAL_NETWORK_OPTIONS } from "../utils/StatusHelpers";

const INITIAL_STATE = {
  holders: [],
  holdersMeta: { pagination: {} },
  isFetching: true,
  shareText:
    "I am a Status Holder in the Jur ecosystem to support the development of a truly decentralized ecosystem for a new legal framework",
  isSharing: false,
  shareNetwork: SOCIAL_NETWORK_OPTIONS[0]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATUS_CHANGE_SHARE_NETWORK:
      return { ...state, shareNetwork: action.payload };
    case STATUS_CHANGE_SHARE_TEXT:
      return { ...state, shareText: action.payload };
    case STATUS_SHARE:
      return { ...state, isSharing: true };
    case STATUS_FETCH_MINE:
      return { ...state, isFetching: true };
    case STATUS_UPDATE_MINE:
      return {
        ...state,
        isFetching: false,
        myStatus: action.payload.data,
        myStatusMeta: action.payload.meta
      };
    case STATUS_FETCH_HOLDERS:
      return { ...state, isFetchingHolders: true };
    case STATUS_UPDATE_HOLDERS:
      return { ...state, isFetchingHolders: false, ...action.payload };
    default:
      return state;
  }
};
