const moment = require("moment");
require("moment-timezone");

const db = require("../../services/database");

const { sendData, sendError } = require("../../../helpers/responseHelper");

const parseDate = require("../../utils/parseDate");

const { TIMEZONE } = require("../../constants");

const getFreeSlots = async (req, res) => {
  const { date, timezone } = req.params;
  if (!date || !timezone) {
    return sendError(res, 400, "Please send the correct param");
  }

  let _date;
  try {
    _date = parseDate(date);
  } catch (err) {
    return sendError(res, 400, err.message || "Date passed is invalid");
  }

  const startOfDay = moment(_date).tz(timezone).startOf("day").tz(TIMEZONE).unix();
  const endOfDay = moment(_date).tz(timezone).endOf("day").tz(TIMEZONE).unix();

  try {
    await db
      .collection("events")
      .where("start_date", ">=", startOfDay)
      .where("start_date", "<=", endOfDay)
      .where("status", "==", 0)
      .get()
      .then(querySnapshot => {
        const { docs } = querySnapshot;
        const events = [];
        if (docs && docs.length) {
          docs.map(doc => {
            const data = doc.data();

            events.push(moment.unix(data.start_date).tz(timezone).format("hh:mm A"));
          });
        }
        return sendData(res, 200, events);
      })
  } catch (err) {
    console.error(`Fetching free slot events: ${err}`);
    return sendError(res, 404, "Unable to fetch the free slot events");
  }
};

module.exports = getFreeSlots;
