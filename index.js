// Employee Tracker App
// requirements
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
// require db folder which includes index.js
const db = require("./db");
const connection = require("./db/connection");
const { createPromptModule } = require("inquirer");
const { insertRole } = require("./db");
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
    console.log("Create employee!");
    // get roles
    // get existing employees
    loadMainPrompts();
}