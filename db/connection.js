// db/connection.js - handles all connection functionality
const mysql = require("mysql");
const util = require("util"); // used to promisify function
require("dotenv").config(); // used to hide password

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "employeesDB"
});

connection.connect((err) => {
    if(err) throw err;
});

// uses promises instead of callbacks
connection.query = util.promisify(connection.query);

module.exports = connection;