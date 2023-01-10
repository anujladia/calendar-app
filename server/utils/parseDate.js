// Function parses the date to toISOString
const parseDate = (date) => {
  let parsedDate;
  try {
    parsedDate = new Date(date).toISOString();
  } catch (err) {
    if (err instanceof RangeError) {
      try {
        parsedDate = new Date(Number(date)).toISOString();
      } catch (_) {
        throw new Error("Invalid date passed");
      }
    } else {
      throw err;
    }
  }

  return parsedDate;
};

module.exports = parseDate;