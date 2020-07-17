export function remaining(time) {
  const now = new Date();
  const timeDiff = time.getTime() - now.getTime();

  const days = parseInt(timeDiff / (1000 * 3600 * 24));
  if (days > 0) return { unit: "days", value: days };

  const hours = parseInt(timeDiff / (1000 * 3600));
  if (hours > 0) return { unit: "hours", value: hours };

  const minutes = parseInt(timeDiff / (1000 * 60));
  if (minutes > 0) return { unit: "minutes", value: minutes };

  const seconds = parseInt(timeDiff / 1000);
  if (seconds >= 0) return { unit: "sec", value: seconds };

  return { unit: "past", value: "now" };
}
