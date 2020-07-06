export const SOCIAL_NETWORK_OPTIONS = [
  {
    value: "facebook"
  },
  {
    value: "twitter"
  },
  {
    value: "linkedIn"
  }
];

export const addDays = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
};

export const statusUrlOf = address =>
  window.location.origin + "/advocates/" + address;

export const isMyProfile = (myAddress = "", location = window.location) => {
  const path = location.pathname.toLocaleLowerCase();
  if (path.endsWith("my-advocasy")) return true;
  return myAddress.length && path.endsWith(myAddress.toLocaleLowerCase());
};

export const getAddressFromUrl = (location = window.location) =>
  location.pathname.split("/").reverse()[0];

export const canWithdraw = ({ dueDate, rewardedOn }) => {
  if (rewardedOn) return false;

  const sevenDays = addDays(new Date(), 7);
  if (new Date(dueDate) < sevenDays) return true;
  return false;
};

export const keyScId = (activityScId, slotScId) =>
  [activityScId, slotScId].join("*");

export const keyRead = (states, activityScId, slotScId) => {
  return Boolean(states[keyScId(activityScId, slotScId)]);
};

export const canMarkComplete = ({ dueDate, state }) => {
  if ("assigned" === state.toLowerCase()) {
    const sevenDays = addDays(new Date(), 7);
    if (new Date(dueDate) < sevenDays) return true;
  }

  return false;
};
