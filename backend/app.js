// // require("dotenv").config();
// const express = require("express");
// const createError = require('http-errors');
// const cookieParser = require('cookie-parser');
// const logger = require("morgan");
// const path = require("path");
// const indexRouter = require("./routes/index");
// const port = 5000;

// const app = express();

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(cors());
// app.use(express.static(path.normalize("../frontend/build")));

// app.use("/api", indexRouter);

// app.get("*", (req, res) => {
//     res.sendFile(
//         path.resolve(__dirname, "..", "frontend", "build", "index.html")
//     );
// });

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });
// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// });

require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const cookieParser = require('cookie-parser');
const axios = require("axios");
const baseURL = 'https://api.nytimes.com';
const _api = axios.create({ baseURL });
const { API_KEY } = require('./config/keys');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const api = await _api.get(`/svc/topstories/v2/home.json?api-key=${API_KEY}`);
        res.send(api.data.results);
    }
    catch (err) {
        console.log(err.message);
    }
});

app.get("/topstories/:section", async (req, res) => {
    console.log(req.params);
    try {
        const section = req.params.section;
        const api = await _api.get(`/svc/topstories/v2/${section}.json?&api-key=${API_KEY}`);
        console.log(api.data);
        res.send(api.data.results);
    }
    catch (err) {
        console.log(err);
    }
});

app.get("/search/:text", async (req, res) => {
    try {
        console.log(req.query);
        const text = req.query.text;
        const api = await _api.get(`/svc/search/v2/articlesearch.json?q=${text}&api-key=${API_KEY}`);
        res.send(api.data.response.docs);
    }
    catch (err) {
        console.log(err.message);
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});