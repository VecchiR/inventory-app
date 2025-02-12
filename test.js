require("dotenv").config();
const express = require("express");
const path = require("node:path");
const { Pool } = require("pg");


const app = express();

const PORT = 3000;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
    console.log('server running on port', PORT);
});


app.use(express.urlencoded({ extended: true }));


const pul = new Pool({connectionString: process.env.CONNECTION_STRING});
async function getAllGames() {
  const { rows } = await pul.query("SELECT * FROM games");
  return rows;
}


app.use("/", async (req, res) => {
    const test = await getAllGames();
    console.log(test);
} )
