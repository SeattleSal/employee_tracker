// connection.js - handles all connection functionality
const mysql = require("mysql");
const util = require("util"); // used to promisify function

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootSal1",
    database: "employeesDB"
});

connection.connect((err) => {
    if(err) throw err;
    console.log("Connected as id" + connection.threadId);
});

// uses promises instead of callbacks
connection.query = util.promisify(connection.query);

module.exports = connection;