// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";

export class OathKeeper {
  static oathTakers(address = "", params) {
    let base = composeBase("oath-takers", address);
    return axios.get(addParams(base, params)).then(r => r.data);
  }

  static analytics(card = "", params) {
    let base = composeBase("analytics", card);
    return axios.get(addParams(base, params)).then(r => r.data);
  }
}

function composeBase(resource, identifier) {
  return ["oath-keeper", resource, identifier].filter(Boolean).join("/");
}

function addParams(url, params) {
  if (!params) return url;

  let urlParams = new URLSearchParams("");

  Object.entries(params)
    .filter(
      ([key, value]) => typeof value === "string" || typeof value === "number"
    )
    .forEach(([key, value]) => urlParams.append(key, value));

  // if (params.sortBy) urlParams.append("sortBy", params.sortBy);
  if (params.page) flattenObject(urlParams, params.page, "page");
  if (params.filter) flattenObject(urlParams, params.filter, "filter");

  return url + "?" + urlParams.toString();
}

function flattenObject(urlParams, object, objectName) {
  Object.entries(object).forEach(([key, value]) =>
    urlParams.append(`${objectName}[${key}]`, value)
  );
}
