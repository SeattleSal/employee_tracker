// Employee Tracker App

const inquirer = require("inquirer");
// require db folder which includes index.js
const db = require("./db");
const logo = require("asciiart-logo");
const { getDepartments } = require("./db");
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
                    name: "View all employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View all roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View all departments",
                    value: "VIEW_DEPARTMENTS"
                }
                // ,
                // {
                //     name: "View all Employees by department",
                //     value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                // },
                // {
                //     name: "View all employees by manager",
                //     value: "VIEW_EMPLOYEES_BY_MANAGER"
                // },
                // {
                //     name: "Exit",
                //     value: "EXIT"
                // }
            ]
        }
    ])
    .then(function(answer) {
        switch(answer.choice) {
            case "VIEW_EMPLOYEES":
                db.getEmployees()
                .then((res) => { 
                    console.log(res);
                    loadMainPrompts();
                })
                .catch((err) => { throw(err); });
                break;
            
            case "VIEW_ROLES":
                db.getRoles()
                .then((res) => { 
                    console.log(res);
                    loadMainPrompts();
                })
                .catch((err) => { throw(err); });
                break;
                
            case "VIEW_DEPARTMENTS":
                db.getDepartments()
                .then((res) => { 
                    console.log(res);
                    loadMainPrompts();
                })
                .catch((err) => { throw(err); });
                break;

            case "EXIT":
                console.log("Exit")
                break;
        }
    });
}


// db.getDepartments().then((results) =>
// console.log(results);
// )