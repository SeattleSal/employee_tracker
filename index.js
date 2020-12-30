// Employee Tracker App
// requirements
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const cTable = require('console.table');
// require db folder which includes index.js
const db = require("./db");
const connection = require("./db/connection");
// const { createPromptModule } = require("inquirer");
// const { insertRole } = require("./db");

init();

// display intro logo
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
                    name: "View budget of department",
                    value: "DEPARTMENT_BUDGET"
                },
                {
                    name: "Exit",
                    value: "EXIT"
                }    
                // TO DO : update employee manager
                // TO DO: view employee by manager
                // TO DO : delete roles and delete employees            
                // ,{
                //     name: "View all Employees by department",
                //     value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                // },
                // {
                //     name: "View all employees by manager",
                //     value: "VIEW_EMPLOYEES_BY_MANAGER"
                // },

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
            
            case "DEPARTMENT_BUDGET":
                viewBudget();
                break;

            default:
                connection.end();
        }
    });
}

function viewDepartments() {
    db.getDepartments()
    .then((res) => { 
        let deptTable = cTable.getTable(res);
        console.log(deptTable);
        loadMainPrompts();
    })
    .catch((err) => { throw(err); });
}

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

function createRole() {
    // console.log("create role");
    // read departments to display as list
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

function createEmployee() {
    // get roles to choose from
    // get existing employees to choose manager or none
    db.getRoles()
    .then(( roles ) => {
        const roleList = roles.map( (role) => ({
            value: role.id,
            name: role.title})
        );

        // put get employees here to put in list for manager display?
        db.getEmployees()
        .then(( employees ) => {
            const employeeList = employees.map((emp) => ({
                value: emp.id,
                name: `${emp.first_name} ${emp.last_name}`
            }));
            employeeList.push({
                value: null,
                name: "No Manager"
            })
            console.log(employeeList);

            inquirer.prompt([
                {
                    message: "What role is this employee for?",
                    name: "roleID",
                    type: "list",
                    choices: roleList
                },
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

function updateEmployeeRole() {
    db.getEmployees()
    .then(( employees ) => {
        const employeeList = employees.map((emp) => ({
            value: emp.id,
            name: `${emp.first_name} ${emp.last_name}`
        }));

        // put get employees here to put in list for manager display?
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

function updateEmployeeManager() {
    db.getEmployees()
    .then(( employees ) => {
        const employeeList = employees.map((emp) => ({
            value: emp.id,
            name: `${emp.first_name} ${emp.last_name}`
        }));

        // create manager list with all but current employee?
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

// delete department
// expect that roles and employees associated with that department will delete

// delete role
// expect the employees will get deleted

// delete employee
// if they are manager, reports should be set as null 

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department
// show the user a list of departments so they can choose one
// select 

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
            // console.log(res);
            // db.insertRole(newRoleInfo)
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