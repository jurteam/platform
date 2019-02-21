import { DISCLAIMER_OPTIN } from "../reducers/types"; // get action types

export const disclaimerAccept = () => ({ type: DISCLAIMER_OPTIN, optin: true });
export const disclaimerDecline = () => ({ type: DISCLAIMER_OPTIN, optin: false });
