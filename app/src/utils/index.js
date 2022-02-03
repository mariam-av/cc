export const toDateTime = (secs) => {
  const date = new Date(1970, 0, 1);
  date.setSeconds(secs);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};
