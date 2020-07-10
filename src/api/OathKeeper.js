// first, include axios (or similar database talker)
import axios from "../bootstrap/Api";
import { toBigFixed, addParams } from "../utils/helpers";

export class OathKeeper {
  static oathTakers(address = "", params) {
    let base = composeBase("oath-takers", address);
    if (params) {
      if (Number(params.minAmount) === 0) delete params.minAmount;
      if (Number(params.maxAmount) === 0) delete params.maxAmount;
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

function isDate(value) {
  return (
    value &&
    typeof value === "object" &&
    value.__proto__ === new Date().__proto__
  );
}

function flattenObject(urlParams, object, objectName) {
  Object.entries(object).forEach(([key, value]) =>
    urlParams.append(`${objectName}[${key}]`, value)
  );
}
