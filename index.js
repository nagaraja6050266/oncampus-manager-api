const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const Pool = require("pg").Pool;

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;
app.listen(port, () => {
    console.log("App is running in port: ", port);
});

const pool = new Pool({
    user: process.env.USER,
    host: "localhost",
    database: "placementcell",
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
    res.send("App is working");
});