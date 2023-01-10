// duration is in minutes always
const addToDate = (date, duration) => {
  return new Date(new Date(date).getTime() + (duration * 60 * 1000));
};

module.exports = addToDate;
