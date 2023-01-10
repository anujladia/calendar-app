const express = require("express");
require("dotenv").config({path: __dirname + "/.env"});

const { sendError, sendData } = require("./helpers/responseHelper");

const apiAdminRoutes = require("./routes/admin");
const apiClientRoutes = require("./routes/client");

const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  sendData(res, 200, "Welcome to Calendar app");
});

app.get("/status", (req, res) => {
  sendData(res, 200, {});
});

app.use("/api/admin", apiAdminRoutes);
app.use("/api", apiClientRoutes);

app.use((req, res) => {
  sendError(res, 404, "No route found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});