const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const path = require("path");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));

app.use(express.json());

app.use(express.static(path.normalize("../frontend/build")));

app.use("/", indexRouter);

app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
});

app.listen(5000, () => {
    console.log("App listening on port 5000!");
});