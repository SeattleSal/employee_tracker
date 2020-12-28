// interactions with database
const connection = require("./connection");

// object methods
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
    },
    insertRole(roleData) {
        // grab data into placeholders
        return connection.query("INSERT INTO role SET ?",
        {
            department_id: roleData.departmentID,
            title: roleData.title,
            salary: roleData.salary
        });
        // function(err, res) {
        //     if (err) throw err;
        //     console.log("Role added: " + res.affectedRows);
        // });
    }
}


// connection.query("")
// .then((res) => {
// })
// .catch((err) => {
//
// });