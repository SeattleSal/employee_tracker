// Employee Tracker App
// requirements
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
// require db folder which includes index.js
const db = require("./db");
const connection = require("./db/connection");
// const { createPromptModule } = require("inquirer");
// const { insertRole } = require("./db");
// require("console.table");

init();

// display intro logo
function init() {
    console.log("Let's go!");
    //const logoText = logo({name: "Employee Manager"}).render();
    // console.log(logoText);
    loadMainPrompts();
};

async function loadMainPrompts() {
    await inquirer.prompt([
// async function loadMainPrompts() {
    // const { choice } = await prompt([
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
                    name: "Create department",
                    value: "CREATE_DEPARTMENT"
                },
                {
                    name: "Create role",
                    value: "CREATE_ROLE"
                },                
                {
                    name: "Create employee",
                    value: "CREATE_EMPLOYEE"
                },
                {
                    name: "Exit",
                    value: "EXIT"
                }                
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

            default:
                connection.end();
        }
    });
}

function viewDepartments() {
    db.getDepartments()
    .then((res) => { 
        console.table(res);
        loadMainPrompts();
    })
    .catch((err) => { throw(err); });
}

function viewRoles() {
    db.getRoles()
    .then((res) => { 
        console.table(res);
        loadMainPrompts();
    })
    .catch((err) => { throw(err); });
}

function viewEmployees() {
    db.getEmployees()
    .then((res) => { 
        console.table(res);
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
            // console.log(res);
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
    .catch((err) => { throw(err);}); // catch error from getDepartments() call
}