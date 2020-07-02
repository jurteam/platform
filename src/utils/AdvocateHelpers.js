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
