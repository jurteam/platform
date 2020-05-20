// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";
import { toBigFixed } from "../utils/helpers";

export class OathKeeper {
  static oathTakers(address = "", params) {
    let base = composeBase("oath-takers", address);

    if (params) {
      if (Number(params.minAmount) > 0)
        params.minAmount = toBigFixed(params.minAmount);
      if (Number(params.maxAmount) > 0)
        params.maxAmount = toBigFixed(params.maxAmount);
    }

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

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string" || typeof value === "number") {
      urlParams.append(key, value);
    } else if (
      typeof value === "object" &&
      value.__proto__ === new Date().__proto__
    ) {
      urlParams.append(key, value);
    }
  });

  return url + "?" + urlParams.toString();
}

function flattenObject(urlParams, object, objectName) {
  Object.entries(object).forEach(([key, value]) =>
    urlParams.append(`${objectName}[${key}]`, value)
  );
}
