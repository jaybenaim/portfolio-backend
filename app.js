const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  CONSTANTS = require("./constants"),
  port = CONSTANTS.PORT || process.env.PORT,
  indexRouter = require("./api/routes/index"),
  cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// // Routes
app.use("/api", indexRouter);

// catch warnings
process.on("warning", (e) => console.warn(e.stack));

// catch errors in development/production
if (app.settings.env === "production") {
  // Do not send stack trace of error message when in production
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Error occurred while handling the request.");
  });
} else {
  // Log stack trace of error message while in development
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.send(err.message);
  });
}

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
