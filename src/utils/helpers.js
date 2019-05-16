import linkify from "linkifyjs/string";

// Log helper only on DEVELOPMENT environmentexport const warn = (mixed, obj) => {
export const log = (mixed, obj, type) => {
  let out = [];
  if (typeof type === "undefined") type = 0; // default to log

  if (process.env.NODE_ENV === "development") {
    if (typeof obj === "undefined") {
      out = [mixed];
    } else {
      out = [mixed, obj];
    }
  }
  switch (type) {
    case -1: // error
      console.error(...out);
      break;
    case 1: // warn
      console.warn(...out);
      break;
    default:
      // log
      console.log(...out);
      break;
  }
};
export const warn = (mixed, obj) => {
  return log(mixed, obj, 1);
};
export const error = (mixed, obj) => {
  return log(mixed, obj, -1);
};

// EVM connection checker
export const checkConnection = web3 => {
  if (!web3) {
    return { pathname: "/" };
  }
};

// Route redirect helper
export const redirect = (...checks) => {
  log("redirect", { checks });
  return (nextState, replace) => {
    log("redirect", { nextState, replace });
    let result;
    checks.some(check => {
      log("redirect", { check });
      result = check();
      return !!result;
    });
    result && replace(result);
  };
};

export const toCurrencyFormat = (value) => {
  const decimals = "1";
  const num = Number(humanToEth(value)) / Number(decimals.padEnd(Number(process.env.REACT_APP_TOKEN_DECIMALS)+1,"0"));
  return num.toFixed(2);
};

export const humanToEth = (value) => {
  const decimals = "1";
  let amount = 0;

  if (typeof value === "string") {
    amount = value.replace(".", "");
  } else {
    amount = Number(value) * Number(decimals.padEnd(Number(process.env.REACT_APP_TOKEN_DECIMALS)+1,"0"));
  };
  return amount;
};

export const ethToHuman = (value) => {
  const decimals = "1";
  const amount = Number(value) / Number(decimals.padEnd(Number(process.env.REACT_APP_TOKEN_DECIMALS)+1,"0"));
  return amount;
};

export const ethToStore = (value) => {
  const amount = Number(value)
  return amount.toFixed(process.env.REACT_APP_TOKEN_DECIMALS);
};

export const getFormattedDate = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const urlify = str => {
  const html = linkify(str, {
    target: (href, type) => {
      if (href.startsWith(window.location.origin)) {
        return "_self";
      } else {
        return "_blank";
      }
    }
  });
  return html;
};

export const dateReducer = date => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const upperCaseFirst = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ellipsisString = (str, count, length) => {
  if (str.length > (count || 10)) {
    return str.substring(0, length || 10) + "...";
  } else {
    return str;
  }
};

export const arrayColumn = (arr, n) => arr.map(x => x[n]);