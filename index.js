// Employee Tracker App
// requirements
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
// require db folder which includes index.js
const db = require("./db");
const connection = require("./db/connection");
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
            
            default:
                connection.end();
                // console.log("Exit")
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