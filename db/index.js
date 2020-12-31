// interactions with database
const connection = require("./connection");

// object methods return a promise
module.exports = {
    // get functions
    getDepartments() {
        return connection.query("SELECT * FROM department")
    },
    getRoles() {
        return connection.query(`select role.id, role.title, role.salary, department.name
            from role
            left join department
            on role.department_id = department.id`)
    },
    getEmployees() {
        // get role and department info from role and department tables
        return connection.query(`SELECT emp.id, emp.first_name, emp.last_name, role.title, dept.name AS 'department', role.salary, CONCAT ( emp2.first_name, " ", emp2.last_name ) AS 'manager'
            FROM employee as emp
            LEFT JOIN role
                ON emp.role_id = role.id
            LEFT JOIN department as dept
                ON role.department_id = dept.id
            LEFT JOIN employee as emp2
                ON emp.manager_id = emp2.id`)
    },
    getManagers() {
        // get role and department info from role and department tables
        return connection.query(`select distinct emp1.id, emp1.first_name, emp1.last_name 
            from employee as emp1
            inner join employee as emp2
                on emp1.id = emp2.manager_id`)
    },
    getEmployeesByManager(managerInfo) {
        return connection.query(`select emp1.first_name, emp1.last_name 
            from employee as emp1
            left join employee as emp2
            on emp1.manager_id = emp2.id
            where emp1.manager_id = ${managerInfo.managerID}`);
    },
    // insert functions
    insertDepartment(deptData){
        return connection.query("INSERT INTO department SET ?",
        {
            name: deptData.name
        });
    },
    insertRole(roleData) {
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
    },
    updateEmployeeRole(empData){
        console.log("from inside db... " + empData)
        return connection.query("UPDATE employee SET ? WHERE ?",
        [
            { 
                role_id: empData.roleID
            },
            {
                id: empData.employeeID
            }
        ]);
    },
    updateEmployeeManager(managerData){
        return connection.query("UPDATE employee SET ? WHERE ?",
        [
            { 
                manager_id: managerData.managerID
            },
            {
                id: managerData.employeeID
            }
        ]);
    },
    deleteDepartment(depInfo){
        return connection.query("DELETE FROM department WHERE ?",
        {
            id: depInfo.departmentID
        });
    },
    deleteRole(roleInfo){
        return connection.query("DELETE FROM role WHERE ?",
        {
            id: roleInfo.roleID
        });
    },    getDepartmentBudget(departmentInfo){
        return connection.query(`SELECT department.id, department.name, SUM(role.salary) AS 'budget' 
                                FROM employee 
                                LEFT JOIN role
                                    on employee.role_id = role.id
                                LEFT JOIN department
                                    on role.department_id = department.id
                                WHERE department.id = ${departmentInfo.departmentID}`,
                );
    }
}


// connection.query("")
// .then((res) => {
// })
// .catch((err) => {
//
// });