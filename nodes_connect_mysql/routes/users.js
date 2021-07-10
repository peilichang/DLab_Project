"use strict"

const express = require("express")
const mysql = require("mysql")
let router = express.Router()

var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'nodetest0709'
});

module.exports = router;