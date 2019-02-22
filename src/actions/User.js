import { DISCLAIMER_OPTIN, DISCLAIMER_VISIBILITY } from "../reducers/types"; // get action types

export const disclaimerAccept = () => ({ type: DISCLAIMER_OPTIN, optin: true });
export const disclaimerDecline = () => ({ type: DISCLAIMER_OPTIN, optin: false });

export const disclaimerView = (viewed) => ({ type: DISCLAIMER_VISIBILITY, viewed });
