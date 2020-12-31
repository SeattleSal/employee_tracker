// Employee Tracker App
// requirements
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const cTable = require('console.table');
// require db folder which includes index.js
const db = require("./db");
const connection = require("./db/connection");

init();

// init - display intro logo
function init() {
    console.log(
        logo({
            name: 'Employee Manager',
            font: 'Big',
            lineChars: 15,
            padding: 2,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'bold-green',
            textColor: 'green',
        })
        .emptyLine()
        .right('version 1.0')
        .emptyLine()
        .center("Create and track departments, roles and employees.")
        .render()
    );
    loadMainPrompts();
};

// loadMainPrompts - menu of options for user to choose
 function loadMainPrompts() {
     inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View all departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View all roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View all employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add department",
                    value: "CREATE_DEPARTMENT"
                },
                {
                    name: "Add role",
                    value: "CREATE_ROLE"
                },                
                {
                    name: "Add employee",
                    value: "CREATE_EMPLOYEE"
                },
                {
                    name: "Update employee role",
                    value: "UPDATE_EMPLOYEE"
                },
                {
                    name: "Update employee manager",
                    value: "UPDATE_EMP_MANAGER"
                },
                {
                    name: "Delete department",
                    value: "DELETE_DEPARTMENT"
                },
                {
                    name: "Delete role",
                    value: "DELETE_ROLE"
                },
                {
                    name: "Delete employee",
                    value: "DELETE_EMPLOYEE"
                },
                {
                    name: "View all employees by manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "View budget of department",
                    value: "DEPARTMENT_BUDGET"
                },
                {
                    name: "Exit",
                    value: "EXIT"
                }    
            ]
        }
    ])
    .then(function(answer) {
        switch(answer.choice) {
            case "VIEW_DEPARTMENTS":
                viewDepartments()
                break;

            case "VIEW_ROLES":
                viewRoles();
                break;
                
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;

            case "CREATE_DEPARTMENT":
                createDepartment();
                break;
            
            case "CREATE_ROLE":
                createRole();
                break;

            case "CREATE_EMPLOYEE":
                createEmployee();
                break;

            case "UPDATE_EMPLOYEE":
                updateEmployeeRole();
                break;
            
            case "UPDATE_EMP_MANAGER":
                updateEmployeeManager();
                break;
            
            case "DELETE_DEPARTMENT":
                deleteDepartment();
                break;
            
            case "DELETE_ROLE":
                deleteRole();
                break;

            case "DELETE_EMPLOYEE":
                deleteEmployee();
                break;

            case "VIEW_EMPLOYEES_BY_MANAGER":
                viewEmployeesByManager();
                break;
            
            case "DEPARTMENT_BUDGET":
                viewBudget();
                break;

            default:
                connection.end();
        }
    });
}

// viewDepartments - shows list of all departments
function viewDepartments() {
    db.getDepartments()
    .then((res) => { 
        let deptTable = cTable.getTable(res);
        console.log(deptTable);
        loadMainPrompts();
    })
    .catch((err) => { throw(err); });
}

// viewRoles - shows list of all roles
function viewRoles() {
    db.getRoles()
    .then((res) => { 
        let roleTable = cTable.getTable(res);
        console.log(roleTable);
        // console.table(res);
        loadMainPrompts();
    })
    .catch((err) => { throw(err); });
}

// viewEmployees - displays employee data with role title, department and salary
function viewEmployees() {
    db.getEmployees()
    .then((res) => { 
        let empTable = cTable.getTable(res);
        console.log(empTable);
        // console.table(res);
        loadMainPrompts();
    })
    .catch((err) => { throw(err); });
}

// createDepartment
function createDepartment() {
    // console.log("create department!");
    inquirer.prompt([
        {
            name: "name",
            message: "What name is the new department?",
            type: "input"
        }
    ]).then( newDepartmentInfo => {
        // console.log(res);
        db.insertDepartment(newDepartmentInfo)
        .then((results) => {
            console.log("New department added");
            loadMainPrompts();
        })
        .catch((err) => { throw (err); }); // catch error from insertDepartment() call
    })
}

// createRole - display departments, then add role to department with title and salary
function createRole() {
    db.getDepartments()
    .then(( departments ) => {
        const departmentList = departments.map( (department) => ({
            value: department.id,
            name: department.name})
        );

        inquirer.prompt([
            {
                name: "departmentID",
                message: "What department is this role for?",
                type: "list",
                choices: departmentList
            },
            {
                name: "title",
                message: "What is the title of this role?",
                type: "input"
            },
            {
                name: "salary",
                message: "What is the salary for this role?",
                type: "input"
            }
        ]).then( newRoleInfo => {
            db.insertRole(newRoleInfo)
            .then((results) => {
                console.log("New role added");
                loadMainPrompts();
            })
            .catch((err) => { throw (err); }); // catch error from insertRole() call
        })

    })
    .catch((err) => { throw(err);}); // catch error from getDepartments() call
}

// createEmployee - displays roles, then user inputs info for new employee
function createEmployee() {
    db.getRoles()
    .then(( roles ) => {
        const roleList = roles.map( (role) => ({
            value: role.id,
            name: role.title})
        );

        db.getEmployees()
        .then(( employees ) => {
            const employeeList = employees.map((emp) => ({
                value: emp.id,
                name: `${emp.first_name} ${emp.last_name}`
            }));
            employeeList.unshift({
                value: null,
                name: "No Manager"
            })

            inquirer.prompt([
                {
                    message: "What is the first name of the employee?",
                    name: "fName",
                    type: "input"
                },
                {
                    message: "What is the last name of the employee?",
                    name: "lName",
                    type: "input"
                },
                {
                    message: "What role is this employee for?",
                    name: "roleID",
                    type: "list",
                    choices: roleList
                },
                {
                    message: "Which employee is the manager for this employee?",
                    name: "managerID",
                    type: "list",
                    choices: employeeList
                }
            ]).then( newEmployeeInfo => {
                // console.log(res);
                db.insertEmployee(newEmployeeInfo)
                .then((results) => {
                    console.log("New Employee added");
                    loadMainPrompts();
                })
                .catch((err) => { throw (err); }); // catch error from insertEmployee() call
            })
        })
        .catch((err) => { throw(err);}); // catch error from getEmployees() call
    })
    .catch((err) => { throw(err);}); // catch error from getRoles() call
}

// updateEmployeeRole - user chooses an employee then chooses a new role for that employee
function updateEmployeeRole() {
    db.getEmployees()
    .then(( employees ) => {
        const employeeList = employees.map((emp) => ({
            value: emp.id,
            name: `${emp.first_name} ${emp.last_name}`
        }));

        db.getRoles()
        .then(( roles ) => {
            const roleList = roles.map( (role) => ({
                value: role.id,
                name: role.title})
            );

            inquirer.prompt([
                {
                    message: "What employee role do you want to change?",
                    name: "employeeID",
                    type: "list",
                    choices: employeeList
                },
                {
                    message: "What is the employee's new role?",
                    name: "roleID",
                    type: "list",
                    choices: roleList
                }
            ]).then( newRoleInfo => {
                console.log(newRoleInfo);
                db.updateEmployeeRole (newRoleInfo)
                .then((results) => {
                    console.log("Employee role updated");
                    loadMainPrompts();
                })
                .catch((err) => { throw (err); }); // catch error from insertEmployee() call
            })
        })
        .catch((err) => { throw(err);}); // catch error from getRoles() call
    })
    .catch((err) => { throw(err);}); // catch error from getEmployees() call
}

// udpateEmployeeManager - display list of employees to choose to change manager,
// then show potential managers (list of employees) and change manager
function updateEmployeeManager() {
    db.getEmployees()
    .then(( employees ) => {
        const employeeList = employees.map((emp) => ({
            value: emp.id,
            name: `${emp.first_name} ${emp.last_name}`
        }));

        // TO DO - create manager list with all but current employee?
        inquirer.prompt([
            {
                message: "What employee do you want to change the manager?",
                name: "employeeID",
                type: "list",
                choices: employeeList
            },
            {
                message: "What is the new manager for this employee?",
                name: "managerID",
                type: "list",
                choices: employeeList,
                // filter: function 
                // employeeList.filter(emp => emp.id != employeeID)
            }
        ]).then( newManagerInfo => {
            // console.log(newRoleInfo);
            db.updateEmployeeManager(newManagerInfo)
            .then((results) => {
                console.log("Employee manager updated");
                loadMainPrompts();
            })
            .catch((err) => { throw (err); }); // catch error from insertEmployee() call
        })
    })
    .catch((err) => { throw(err);}); // catch error from getEmployees() call
}

// delete department - delete department and any roles and employees associated with that department
function deleteDepartment(){
    db.getDepartments()
    .then(( departments ) => {
        const departmentList = departments.map( (department) => ({
            value: department.id,
            name: department.name})
        );

        inquirer.prompt([
            {
                name: "departmentID",
                message: "What department do you want to delete?",
                type: "list",
                choices: departmentList
            }
        ]).then( departmentID => {
            // console.log(res);
            // db.insertRole(newRoleInfo)
            db.deleteDepartment(departmentID)
            .then((results) => {
                console.log("Department deleted");
                loadMainPrompts();
            })
            .catch((err) => { throw (err); }); // catch error from insertRole() call
        })

    })
    .catch((err) => { throw(err);}); // catch error from getDepartments() call 
}

// delete role - delete roll and any employees with that role
function deleteRole() {
    db.getRoles()
    .then(( roles ) => {
        const roleList = roles.map( (role) => ({
            value: role.id,
            name: role.title})
        );

        inquirer.prompt([
            {
                name: "roleID",
                message: "What role do you want to delete?",
                type: "list",
                choices: roleList
            }
        ]).then( roleID => {
            db.deleteRole(roleID)
            .then((results) => {
                console.log("Role deleted");
                loadMainPrompts();
            })
            .catch((err) => { throw (err); }); // catch error from insertRole() call
        })

    })
    .catch((err) => { throw(err);}); // catch error from getDepartments() call 
}

// deleteEmployee - choose employee to delete, if employee is a manager their employees will show null as manager id
function deleteEmployee() {
    db.getEmployees()
    .then(( employees ) => {
        const employeeList = employees.map((emp) => ({
            value: emp.id,
            name: `${emp.first_name} ${emp.last_name}`
        }));

        inquirer.prompt([
            {
                message: "What employee do you want delete?",
                name: "employeeID",
                type: "list",
                choices: employeeList
            }
        ]).then( newManagerInfo => {
            db.deleteEmployee(newManagerInfo)
            .then((results) => {
                console.log("Employee deleted");
                loadMainPrompts();
            })
            .catch((err) => { throw (err); }); // catch error from deleteEmployee
        })
    })
    .catch((err) => { throw(err);}); // catch error from getEmployees() call
}

// viewEmployeesByManager - show all managers for user to choose from, then employees for that chosen manager
function viewEmployeesByManager() {
    db.getManagers()
    .then(( managers ) => {
        const managerList = managers.map (( manager ) => ({
            value: manager.id,
            name: `${manager.first_name} ${manager.last_name}`
        }));

        inquirer.prompt([
            {
                message: "What manager's employees do you want to view?",
                name: "managerID",
                type: "list",
                choices: managerList
            }
        ])
        .then(managerInfo => {
            // console.log(managerInfo);
            db.getEmployeesByManager(managerInfo)
            .then((results) => {
                let empTable = cTable.getTable(results);
                console.log(empTable);
                loadMainPrompts();
            })
            .catch((err) => { throw (err); }); // catch from getEmployeesByManager 
        })
    })
    .catch((err) => { throw (err); }); // catch from getManagers call
}

// viewBudget - View the total utilized budget of a department -- ie the combined salaries of all employees in that department
function viewBudget() {
    db.getDepartments()
    .then(( departments ) => {
        const departmentList = departments.map( (department) => ({
            value: department.id,
            name: department.name})
        );

        inquirer.prompt([
            {
                name: "departmentID",
                message: "What department do you want to see the budget for?",
                type: "list",
                choices: departmentList
            }
        ]).then( departmentInfo => {
            db.getDepartmentBudget(departmentInfo)
            .then((results) => {
                let budgetTable = cTable.getTable(results);
                console.log(budgetTable);
                loadMainPrompts();
            })
            .catch((err) => { throw (err); }); // catch error from insertRole() call
        })

    })
    .catch((err) => { throw(err);}); // catch error from getDepartments() call
}

