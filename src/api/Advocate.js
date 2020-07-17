import axios from "../bootstrap/Api";
import { addParams } from "../utils/helpers";

export const shareOnTwitter = (
  text,
  url = window.location.toString(),
  tags = "#jur,#openJustice,#jurStatus"
) => {
  "https://twitter.com/home?status=http://localhost:9009/?path=/story/status--sharestatusbutton I am a Status Holder in the Jur ecosystem to support the development of a truly decentralized ecosystem for a new legal framework";
  const sharableLink = `https://twitter.com/share?text=${text}&url=${url}&hashtags=${tags}`;
  return window.open(sharableLink, "_blank");
};

export const shareOnFacebook = (text, url = window.location.toString()) => {
  const sharableLink = `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${text}`;
  return window.open(sharableLink, "_blank");
};

export const shareOnLinkedIn = (
  text,
  url = window.location.toString(),
  title = ""
) => {
  const sharableLink = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`;
  return window.open(sharableLink, "_blank");
};

export const shareOn = (network, text, url, title, hashtags) => {
  return {
    twitter: shareOnTwitter,
    facebook: shareOnFacebook,
    linkedIn: shareOnLinkedIn
  }[network](text, url, hashtags || title);
};

export const advocates = (address = "", params) =>
  axios
    .get(addParams(["/advocates/", address].filter(Boolean).join(""), params))
    .then(r => r.data);

export const available = address =>
  axios.get(`/advocates/${address}/activities/available`).then(r => r.data);

export const yourActivities = address =>
  axios.get(`/advocates/${address}/activities/ongoing`).then(r => r.data);

export const rewards = address =>
  axios.get(`/rewards/${address}`).then(r => r.data);

export const updateBio = (bio, address) => {
  return axios.put(`/advocates/${address}`, {
    bio: bio
  })
}
