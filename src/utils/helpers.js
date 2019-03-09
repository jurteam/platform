
import linkify from 'linkifyjs/string';

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

export const transformDate = date => {
  let transformedDate = '';
  const parsedDate = Date.parse(date);
  const now = Date.parse(new Date());
  const diff = now - parsedDate;
  const minute = 1000 * 60;
  const hour = minute * 60; 
  const day = hour * 24;
  const minutesLimit = minute * 5; // 5 minute
  const hoursLimit = minute * 24; // 24 hours
  const daysLimit = minute * 2; // 2 days


  if (diff < minutesLimit) {
    transformedDate = 'few seconds ago';
  } else if (diff > minute && diff < minutesLimit) {
    transformedDate = 'few minutes ago';
  } else if (diff > minutesLimit && diff < hoursLimit) {
    transformedDate = 'few hours ago';
  } else {
    transformedDate = 'few days ago';
  }
  return transformedDate;
}