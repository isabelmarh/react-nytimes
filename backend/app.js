require("dotenv").config();
const express = require("express");
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require("morgan");
const path = require("path");
const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.normalize("../frontend/build")));

app.use("/api", indexRouter);

app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(5000, () => {
    console.log("App listening on port 5000!");
});