const firebase = require("firebase-admin");
const moment = require("moment");
require("moment-timezone");

const db = require("../../services/database");

const { sendData, sendError } = require("../../../helpers/responseHelper");

const parseDate = require("../../utils/parseDate");

const {
  TIMEZONE, DURATION,
} = require("../../constants");

const bookSlot = (docId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db
        .collection("events")
        .doc(docId)
        .update("status", 1)
        .then(_ => {
          resolve();
        });
    } catch (err) {
      reject(new Error(`Error booking the slot ${docId}: ${err.message}`));
    }
  })
}

const bookEvent = async (req, res) => {
  const { date, duration } = req.params;

  if (!date || !duration) {
    return sendError(res, 400, "Please send the correct param");
  }

  let eventDate;
  try {
    eventDate = parseDate(date);
  } catch (err) {
    return sendError(res, 400, err.message || "Date passed is invalid");
  }

  const _eventDate = moment(eventDate).tz(TIMEZONE).format();

  const numberOfSlotsToBook = Number(duration) < DURATION ? 1 : Math.ceil(Number(duration) / DURATION);

  try {
    const docIdToBeUpdated = [];
    // Check if the slot user is trying to book exist and is free
    await db
      .collection("events")
      .where(firebase.firestore.FieldPath.documentId(), ">=", _eventDate)
      .limit(numberOfSlotsToBook)
      .get()
      .then(querySnapshot => {
        const { docs } = querySnapshot;

        if (!docs.length) {
          throw new Error("Time slot passed is not an allowed event")
        }

        for (let i = 0; i < docs.length; i += 1) {
          const doc = docs[i];
          if (i === 0 && doc.id !== _eventDate) {
            throw new Error("Time slot passed is not an allowed event")
          }

          const data = doc.data();
          if (data.status) {
            throw {
              name: "already_booked",
              message: "Time slot passed is already booked. Select a different slot or select a smaller duration"
            };
          }

          docIdToBeUpdated.push(doc.id);
        }
      });

    if (docIdToBeUpdated.length !== numberOfSlotsToBook) {
      return sendError(res, 404, "Please select a smaller duration to book this event");
    }
    
    // Update the status of the event as booked
    const updateDocTask = [];
    docIdToBeUpdated.map(docId => updateDocTask.push(bookSlot(docId)));

    try {
      await Promise.all(updateDocTask);
      return sendData(res, 200, "Slot is booked successfully");
    } catch (err) {
      throw err;
    }
  } catch (err) {
    console.error(`Booking slot events: ${err}`);
    if (err.name === "already_booked") {
      return sendError(res, 422, err.message);
    }

    if (err.message.includes("NOT_FOUND")) {
      return sendError(res, 404, "Date passed is not an allowed event");
    }

    return sendError(res, 404, err.message || "Unable to fetch the free slot events");
  }
};

module.exports = bookEvent;
