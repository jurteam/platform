const REWARD_DELAY_IN_MILISECONDS =
  (process.env.REACT_APP_REWARD_DELAY_IN_SECONDS || 604800) * 1000; // 604800 seconds = 7 days

export const SOCIAL_NETWORK_OPTIONS = [
  { value: "facebook" },
  { value: "twitter" },
  { value: "linkedIn" },
  { value: "copy" }
];

export const colorSlots = (filled, total) => {
  if (!total) return "";
  const ratio = Number(filled) / Number(total);
  if (ratio < 0.5) return "jur-slot__sparse";
  if (ratio < 0.8) return "jur-slot__moderate";
  return "jur-slot__scarce";
};

export const copyToClipboard = text => {
  console.log("copyToClipboard");

  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const addSeconds = (date, seconds = REWARD_DELAY_IN_MILISECONDS) => {
  date.setSeconds(date.getSeconds() + seconds);
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

  const allowedSince = addSeconds(new Date(Number(dueDate) * 1000));
  if (new Date() < allowedSince) return true;
  return false;
};

export const keyScId = (activityScId, slotScId) =>
  [activityScId, slotScId].join("*");

export const keyRead = (states, activityScId, slotScId) => {
  return Boolean(states[keyScId(activityScId, slotScId)]);
};

export const canMarkComplete = ({ dueDate, state }) => {
  if ("assigned" === state.toLowerCase()) {
    const allowedSince = addSeconds(new Date(Number(dueDate) * 1000));
    if (new Date() < allowedSince) return true;
  }

  return false;
};
