const express = require("express");
const router = express.Router();

const createAdminEvents = require("../server/controllers/administrator/createAdminEvents");

router.post("/event/create/:start_date?/:end_date?/:duration?", createAdminEvents);

module.exports = router;
