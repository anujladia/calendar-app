// duration is in minutes always
const parseTime = (timestamp) => {
  const date = new Date(timestamp);
  console.log(timestamp);
  console.log(date);

  let hour = date.getHours();
  const minute = date.getMinutes();

  const timeRef = hour >= 12 ? "PM" : "AM";

  if (hour !== 12 && hour > 12) {
    hour = hour % 12;
  }

  return `${hour.toString().padStart(2, 0)}:${minute.toString().padStart(2, 0)} ${timeRef}`;
};

module.exports = parseTime;
