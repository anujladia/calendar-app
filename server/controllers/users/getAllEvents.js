const moment = require("moment");
require("moment-timezone");

const db = require("../../services/database");

const { sendData, sendError } = require("../../../helpers/responseHelper");

const parseDate = require("../../utils/parseDate");

const { TIMEZONE } = require("../../constants");

const getAllEvents = async (req, res) => {
  const { start_date: startDate, end_date: endDate } = req.params;
  if (!startDate || !endDate) {
    return sendError(res, 400, "Please send the correct param");
  }

  let tStartDate;
  try {
    tStartDate = parseDate(startDate);
  } catch (err) {
    return sendError(res, 400, err.message || "Date passed is invalid");
  }

  let tEndDate;
  try {
    tEndDate = parseDate(endDate);
  } catch (err) {
    return sendError(res, 400, err.message || "Date passed is invalid");
  }

  try {
    await db
      .collection("events")
      .where("start_date", ">=", moment(tStartDate).unix())
      .where("start_date", "<=", moment(tEndDate).unix())
      .get()
      .then(querySnapshot => {
        const { docs } = querySnapshot;
        const events = [];
        if (docs && docs.length) {
          docs.map(doc => {
            const data = doc.data()
            events.push(moment.unix(data.start_date).tz(TIMEZONE).format());
          });
        }
        return sendData(res, 200, events);
      })
  } catch (err) {
    console.error(`Fetching all events: ${err}`);
    return sendError(res, 404, "Unable to fetch the events");
  }
};

module.exports = getAllEvents;
