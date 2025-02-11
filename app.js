require("dotenv").config();
const express = require("express");
const path = require("node:path");

const app = express();

const PORT = 3000;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
    console.log('server running on port', PORT);
});


app.use(express.urlencoded({ extended: true }));



