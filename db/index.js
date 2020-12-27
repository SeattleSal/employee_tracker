// interactions with database
const connection = require("./connection");

module.exports = {
    getDepartments() {
        // return results of getting all deparmtnets
        // return a promise
        return connection.query("SELECT * FROM department")
    },
    getRoles() {
        return connection.query("SELECT * FROM role")

    },
    getEmployees() {
        return connection.query("SELECT * FROM employee")
    }
}


// connection.query("")
// .then((res) => {
// })
// .catch((err) => {
//
// });