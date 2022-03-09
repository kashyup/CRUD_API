const { urlencoded } = require("express");
const express = require("express");
const { append } = require("express/lib/response");

const mongoose = require("mongoose");

const common = require("./config/config.js");

const app = express();

app.use(express.json({extended:true}));

app.use(express.urlencoded({extended:true}));


const PORT = common.config()["PORT"];

const URL = common.config()["MONGODB_URL"];

console.log(PORT);

console.log(URL);