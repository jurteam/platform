import { DISCLAIMER_OPTIN, DISCLAIMER_VISIBILITY, UPDATE_USER_FIELD, PUT_USER } from "../reducers/types"; // get action types

export const disclaimerAccept = () => ({ type: DISCLAIMER_OPTIN, optin: true });
export const disclaimerDecline = () => ({ type: DISCLAIMER_OPTIN, optin: false });

export const disclaimerView = (viewed) => ({ type: DISCLAIMER_VISIBILITY, viewed });

export const updateUserField = (field, value) => ({ type: UPDATE_USER_FIELD, field, value });
export const updateUser = () => ({ type: PUT_USER });
