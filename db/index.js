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
        // return connection.query("SELECT * FROM employee")
        return connection.query(`SELECT emp.id, emp.first_name, emp.last_name, role.title, dept.name AS 'department', role.salary, CONCAT ( emp2.first_name, " ", emp2.last_name ) AS 'manager name'
            FROM employee as emp
            LEFT JOIN role
                ON emp.role_id = role.id
            LEFT JOIN department as dept
                ON role.department_id = dept.id
            LEFT JOIN employee as emp2
                ON emp.manager_id = emp2.id`)
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