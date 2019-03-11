import linkify from 'linkifyjs/string';

// Log helper only on DEVELOPMENT environmentexport const warn = (mixed, obj) => {
export const warn = (mixed, obj) => {
  return log(mixed, obj, 1);
};
export const error = (mixed, obj) => {
  return log(mixed, obj, -1);
};
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

export const toCurrencyFormat = value => {
  var num = Number(value) / 100;
  var res = num.toString().split(".");
  if (res.length === 1 || res[1].length < 2) return num.toFixed(2);
  return num;
};

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const urlify = str => {
  const html = linkify(str, {
    target: (href, type) => {
      if (href.startsWith(window.location.origin)) {
        return '_self';
      } else {
        return '_blank';
      }
    }
  });
  return html;
};

export const ellipsisString = (str, count, length) => {
  if (str.length > (count || 10)) {
    return str.substring(0, (length || 10)) + '...';
  } else {
    return str;
  }
};
