const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

require("dotenv").config()

const urlRouter = require("./apps/url_shortener/app.js")

const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
})

app.use("/api/url/", urlRouter)

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("connected to db")
    app.listen(8000)
})