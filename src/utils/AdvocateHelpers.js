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

export const statusUrlOf = address =>
  window.location.origin + "/advocates/" + address;

export const isMyProfile = (myAddress = "", location = window.location) => {
  const path = location.pathname.toLocaleLowerCase();
  if (path.endsWith("my-advocasy")) return true;
  return myAddress.length && path.endsWith(myAddress.toLocaleLowerCase());
};
