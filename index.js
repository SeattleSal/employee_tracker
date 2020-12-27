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
    getDepartments()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        throw(err);
    });

    //const logoText = logo({name: "Employee Manager"}).render();
    // console.log(logoText);
    //loadMainPRompts();
};

// async function loadMainPrompts() {
//     const { choice } = await prompt([
//         {
//             type: "list",
//             name: "choice",
//             message: "What would you like to do?",
//             choices: [
//                 {
//                     name: "View all employees",
//                     value: "VIEW_EMPLOYEES",
//                 },
//                 {
//                     name: "View all Employees by department",
//                     value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
//                 },
//                 {
//                     name: "View all employees by manager",
//                     value: "VIEW_EMPLOYEES_BY_MANAGER"
//                 }
//             ]
//         }
//     ])
// }


// db.getDepartments().then((results) =>
// console.log(results);
// )