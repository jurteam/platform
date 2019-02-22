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
  var num = Number(value) / 100;
  var res = num.toString().split('.');
  if (res.length === 1 || res[1].length < 2) return num.toFixed(2);
  return num;
};

export const capitalize = string => (string.charAt(0).toUpperCase() + string.slice(1));