var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
//引入設定檔
const config = require("./config/config");
app.get('/download', (req, res) => res.download(path.join(__dirname, './route/mouse.pdf')))
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(config.db.url);
//if connect database error
const db = mongoose.connection;
db.on("err", (err) => console.log(err));
//if success
db.once("open", () => console.log("資料庫連線成功..."));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
