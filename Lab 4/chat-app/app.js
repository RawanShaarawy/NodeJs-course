var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const createError = require("http-errors");
require("./db");

var app = express();

// app.options((req, res, next) => {
//   if (req.method !== "OPTIONS") return next();
//   res.set({
//     "Access-Control-Allow-Origin": req.headers.origin, //"http://localhost:3001"
//     "Access-Control-Allow-Method": "POST",
//     "Access-Control-Allow-Headers": "content-type"
//   });
//   res.end();
// });
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

// not found middleware
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
