const REWARD_DELAY_IN_SECONDS =
  Number(process.env.REACT_APP_REWARD_DELAY_IN_SECONDS) || 604800; // 604800 seconds = 7 days
console.log("REWARD_DELAY_IN_SECONDS", REWARD_DELAY_IN_SECONDS);

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
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const addSeconds = (date, seconds = REWARD_DELAY_IN_SECONDS) => {
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

export const keyScId = (activityScId, slotScId) =>
  [activityScId, slotScId].join("*");

export const keyRead = (states, activityScId, slotScId) => {
  return Boolean(states[keyScId(activityScId, slotScId)]);
};

export const canMarkComplete = ({ dueDate, state }) => {
  if ("assigned" === state.toLowerCase()) {
    const allowedSince = new Date(Number(dueDate) * 1000);
    if (new Date() > allowedSince) return true;
  }

  return false;
};

export const canWithdraw = ({ dueDate, rewardedOn }) => {
  if (rewardedOn) return false;

  const allowedSince = addSeconds(new Date(Number(dueDate) * 1000));
  if (new Date() > allowedSince) return true;
  return false;
};

export function makeKey({ activityScId, slotScId }) {
  return keyScId(activityScId, slotScId);
}

export function setSlotState(state, slot, slots) {
  const { activityScId, slotScId } = slot;
  return slots.map(a => {
    if (
      a.attributes.activityScId === activityScId &&
      a.attributes.slotScId === slotScId
    ) {
      return {
        ...a,
        attributes: { ...a.attributes, ...slot, state }
      };
    }
    return a;
  });
}

export function isCompleted({ state }) {
  return state === "Completed";
}

export function formatWaiting(time) {
  if (time.unit === "past") return `Refresh to enable withdraw`;
  return `Withdraw in ${time.value} ${time.unit}`;
}

export function withdrawTimeOf(dueDate) {
  return addSeconds(new Date(Number(dueDate) * 1000));
}
