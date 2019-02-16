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

export const toCurrencyFormat = (value) => {
  return parseFloat(value).toFixed(2);
};

export const capitalize = string => (string.charAt(0).toUpperCase() + string.slice(1));