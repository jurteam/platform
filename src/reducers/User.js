import {
  DISCLAIMER_OPTIN,
  DISCLAIMER_VISIBILITY,
  USER_UPDATE,
  UPDATE_USER_FIELD,
  USER_UPDATING,
  RESET_USER,
  FETCH_USER,
  NEW_USER,
  PUT_USER,
  SET_USER_ACTIVITIES,
  FETCH_ACTIVITIES,
  SET_ACTIVITY_STATUS_READED
} from "./types"; // action types

const INITIAL_STATE = {
  disclaimer: {
    optin: false,
    viewed: false
  },
  updating: false,
  id: null,
  name: "",
  email: "",
  wallet: "",
  birth_date: null,
  gender: null,
  location: null,
  category: null,
  show_fullname: false,
  accepted_terms: false,
  accepted_disclaimer: false,
  created_at: null,
  updated_at: null,
  activities: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case DISCLAIMER_OPTIN:
      return {
        ...state,
        disclaimer: { ...state.disclaimer, optin: action.optin }
      };

    case DISCLAIMER_VISIBILITY:
      return {
        ...state,
        disclaimer: { ...state.disclaimer, viewed: action.viewed }
      };

    case USER_UPDATE:
      return { ...state, ...action.user, updating: false };

    case USER_UPDATING:
      return { ...state, updating: action.payload };

    case SET_USER_ACTIVITIES:
      return { ...state, activities: action.activities };

    case SET_ACTIVITY_STATUS_READED:

      const updatedActivities = state.activities.map((activity) => {
        if (action.ids.indexOf(activity.id) >= 0) {
          return { ...activity, readed: 1 }
        }
        return activity
      });

      return {
        ...state,
        activities: updatedActivities
      };

    // Updates
    case UPDATE_USER_FIELD:
      let toUpdate = {};
      toUpdate[action.field] = action.value;
      console.log(UPDATE_USER_FIELD, toUpdate);
      return { ...state, ...toUpdate };

    // Fetching
    case FETCH_ACTIVITIES:
    case FETCH_USER:
    case NEW_USER:
    case PUT_USER:
      return { ...state, updating: true };

    // Reset
    case RESET_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
