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
