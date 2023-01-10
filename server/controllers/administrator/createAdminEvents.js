const moment = require("moment");
require("moment-timezone");

const db = require("../../services/database");
const {
  TIMEZONE, START_DATE, END_DATE, DURATION,
} = require("../../constants");

const parseDate = require("../../utils/parseDate");

const { sendData, sendError } = require("../../../helpers/responseHelper");

const createEvents = async (req, res) => {
  let { start_date: startDate = START_DATE, end_date: endDate = END_DATE, duration = DURATION } = req.params;

  if (!startDate || !endDate || !duration) {
    return sendError(res, 400, "Please send the correct param");
  }

  try {
    startDate = parseDate(startDate);
  } catch (err) {
    return sendError(res, 400, err.message || "Date passed is invalid");
  }

  try {
    endDate = parseDate(endDate);
  } catch (err) {
    return sendError(res, 400, err.message || "Date passed is invalid");
  }

  duration = Number(duration);

  let slotsAvailable = true;
  let _startDate = moment(startDate);

  do {
    // Adding Events data to the Event table
    const _endDate = moment(_startDate).add(duration, "minutes");
    try {
      await db
        .collection("events")
        .doc(moment(_startDate).tz(TIMEZONE).format())
        .set({
          start_date: moment(_startDate).tz(TIMEZONE).unix(),
          end_date: moment(_endDate).tz(TIMEZONE).unix(),
          duration: Number(duration),
          status: 0,
        });
    } catch (err) {
      console.log(`Error adding the events: ${err}`);
    }

    if (new Date(_startDate) >= new Date(endDate)) {
      slotsAvailable = false;
    } else {
      _startDate = _endDate;
    }
  } while (slotsAvailable);

  return sendData(res, 200, "Empty slots added");
};

module.exports = createEvents;
