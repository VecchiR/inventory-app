require("dotenv").config();
const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const gameRouter = require("./routes/gameRouter");
const tagRouter = require("./routes/tagRouter");
const platformRouter = require("./routes/platformRouter");

const app = express();

const PORT = 3000;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
    console.log('server running on port', PORT);
});


app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/game", gameRouter);
app.use("/tag", tagRouter);
app.use("/platform", platformRouter);

