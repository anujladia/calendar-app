const express = require("express");
const router = express.Router();

const getAllEvents = require("../server/controllers/users/getAllEvents");
const getFreeSlots = require("../server/controllers/users/getFreeSlots");
const bookEvent = require("../server/controllers/users/bookEvent");

router.get("/event/all/:start_date/:end_date", getAllEvents);

router.get("/event/free/:date/:timezone", getFreeSlots);

router.put("/event/book/:date/:duration", bookEvent);

module.exports = router;
