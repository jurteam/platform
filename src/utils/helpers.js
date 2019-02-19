// Log helper only on DEVELOPMENT environment
export const log = (mixed, obj) => {
  if (process.env.NODE_ENV === "development") {
    if (typeof obj === "undefined") {
      console.log(mixed);
    } else {
      console.log(mixed, obj);
    }
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

export const toCurrencyFormat = (value) => {
  return parseFloat(value).toFixed(2);
};

export const capitalize = string => (string.charAt(0).toUpperCase() + string.slice(1));
