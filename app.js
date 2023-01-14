const express = require("express");

const pino = require('pino-http')();

const path = require("path");
require("dotenv").config({path: __dirname + "/.env"});

const { sendError, sendData } = require("./helpers/responseHelper");

const apiAdminRoutes = require("./routes/admin");
const apiClientRoutes = require("./routes/client");

const app = express();

const port = process.env.PORT;

app.use("/dist", express.static(path.join(__dirname, "dist")));

// app.get("/", (req, res) => {
//   sendData(res, 200, "Welcome to Calendar app");
// });

app.get("/status", (req, res) => {
  sendData(res, 200, {});
});

app.use(pino);

// app.use("/", function (req, res) {
//   req.log.info("something")
//   res.send("hello world")
// })

/**
 * Handling API routes
 */
app.use("/api/admin", apiAdminRoutes);
app.use("/api", apiClientRoutes);

/**
 * Handling Client routes
 */
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "client/public/index.html"));
});

app.use((req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});