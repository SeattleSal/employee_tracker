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
    insertDepartment(deptData){
        return connection.query("INSERT INTO department SET ?",
        {
            name: deptData.name
        });
    },
    insertRole(roleData) {
        // grab data into placeholders
        return connection.query("INSERT INTO role SET ?",
        {
            department_id: roleData.departmentID,
            title: roleData.title,
            salary: roleData.salary
        });
    },
    insertEmployee(empData){
        return connection.query("INSERT INTO employee SET ?",
        {
            first_name: empData.fName,
            last_name: empData.lName,
            role_id: empData.roleID,
            manager_id: empData.managerID
        });
    }
}


// connection.query("")
// .then((res) => {
// })
// .catch((err) => {
//
// });