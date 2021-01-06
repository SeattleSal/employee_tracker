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
async function viewDepartments() {
    try {
        const departments = await db.getDepartments();
        let deptTable = cTable.getTable(departments);
        console.log(deptTable);
        loadMainPrompts();
    }
    catch (err) { console.log(err); }
}

// viewRoles - shows list of all roles
async function viewRoles() {
    try {
        const roles = await db.getRoles()
        let roleTable = cTable.getTable(roles);
        console.log(roleTable);
        loadMainPrompts();
    }
    catch (err) { console.log(err); }
}

// viewEmployees - displays employee data with role title, department and salary
async function viewEmployees() {
    try {
        const employees = await db.getEmployees();
        let empTable = cTable.getTable(employees);
        console.log(empTable);
        loadMainPrompts();
    }
    catch (err) { console.log(err); }
}

// createDepartment
async function createDepartment() {
    try {
        const newDepartmentInfo = await inquirer.prompt([
            {
                name: "name",
                message: "What name is the new department?",
                type: "input"
            }   
        ]);
        const departments = await db.insertDepartment(newDepartmentInfo);
        console.log("New department added");
        viewDepartments();
    }
    catch (err) { console.log(err); }
}


// createRole - display departments, then add role to department with title and salary
async function createRole() {
    try {
        const departments = await db.getDepartments();
        const departmentList = departments.map( (department) => ({
            value: department.id,
            name: department.name})
        );

        const newRoleInfo = await inquirer.prompt([
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
        ])

        const results = await db.insertRole(newRoleInfo);
        console.log("New role added");
        viewRoles();
    }
    catch (err) { console.log(err); }
}

// createEmployee - displays roles, then user inputs info for new employee
async function createEmployee() {
    try {
        const roles = await db.getRoles();
        const roleList = roles.map( (role) => ({
            value: role.id,
            name: role.title})
        );

        const employees = await db.getEmployees();
        const employeeList = employees.map((emp) => ({
            value: emp.id,
            name: `${emp.first_name} ${emp.last_name}`
        }));
        employeeList.unshift({
            value: null,
            name: "No Manager"
        })

        const newEmployeeInfo = await inquirer.prompt([
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
        ]);
        const results = await db.insertEmployee(newEmployeeInfo);
            console.log("New Employee added");
            viewEmployees();
    }
    catch (err) { console.log(err); }
}

// updateEmployeeRole - user chooses an employee then chooses a new role for that employee
async function updateEmployeeRole() {
    try {
        const employees = await db.getEmployees();
        const employeeList = employees.map((emp) => ({
            value: emp.id,
            name: `${emp.first_name} ${emp.last_name}`
        }));

        const roles = await db.getRoles();
        const roleList = roles.map( (role) => ({
            value: role.id,
            name: role.title})
        );

        const newRoleInfo = await inquirer.prompt([
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
        ])
        const results = await db.updateEmployeeRole(newRoleInfo);
        console.log("Employee role updated");
        viewEmployees();
    }
    catch (err) { console.log(err); }
}


// udpateEmployeeManager - display list of employees to choose to change manager,
// then show potential managers (list of employees) and change manager
async function updateEmployeeManager() {
    try {
        let newManagerInfo = [];

        const employees = await db.getEmployees();
        const employeeList = employees.map((emp) => ({
            value: emp.id,
            name: `${emp.first_name} ${emp.last_name}`
        }));

        const selectedEmployee = await inquirer.prompt([
            {
                message: "What employee do you want to change the manager?",
                name: "employeeID",
                type: "list",
                choices: employeeList
            } 
        ])
        const managerList = employeeList.filter(emp => emp.value != selectedEmployee.employeeID);

        const selectedManager = await inquirer.prompt([
            {
                message: "Who is the new manager for this employee?",
                name: "managerID",
                type: "list",
                choices: managerList
            }
        ])
        newManagerInfo = [selectedEmployee, selectedManager];

        const results = await db.updateEmployeeManager(newManagerInfo);
        console.log("Employee manager updated");
        viewEmployees();
    }
    catch (err) { console.log(err); }
}

// delete department - delete department and any roles and employees associated with that department
async function deleteDepartment() {
    try {
    const departments = await db.getDepartments();
    const departmentList = departments.map( (department) => ({
        value: department.id,
        name: department.name})
    );

    const departmentID = await inquirer.prompt([
        {
            name: "departmentID",
            message: "What department do you want to delete?",
            type: "list",
            choices: departmentList
        }
    ]);
    
    const results = await db.deleteDepartment(departmentID);
    console.log("Department deleted");
    viewDepartments();
    } catch (err) {console.log(err)}
}


// delete role - delete roll and any employees with that role
async function deleteRole() {
    try {
        const roles = await db.getRoles();
        const roleList = roles.map( (role) => ({
            value: role.id,
            name: role.title})
        );

        const roleID = await inquirer.prompt([
            {
                name: "roleID",
                message: "What role do you want to delete?",
                type: "list",
                choices: roleList
            }
        ])
        const results = await db.deleteRole(roleID);
        console.log("Role deleted");
        viewRoles();
    }
    catch (err) { console.log(err); }
}

// deleteEmployee - choose employee to delete, if employee is a manager their employees will show null as manager id
async function deleteEmployee() {
    try {
        const employees = await db.getEmployees();
        const employeeList = employees.map((emp) => ({
            value: emp.id,
            name: `${emp.first_name} ${emp.last_name}`
        }));

        const employeeInfo = await inquirer.prompt([
            {
                message: "What employee do you want delete?",
                name: "employeeID",
                type: "list",
                choices: employeeList
            }
        ]);

        const results = await db.deleteEmployee(employeeInfo);
        console.log("Employee deleted");
        viewEmployees();
    }
    catch (err) { console.log(err); }
}

// viewEmployeesByManager - show all managers for user to choose from, then employees for that chosen manager
async function viewEmployeesByManager() {
    try {
        const managers = await db.getManagers();
        const managerList = managers.map (( manager ) => ({
            value: manager.id,
            name: `${manager.first_name} ${manager.last_name}`
        }));

        const managerInfo = await inquirer.prompt([
            {
                message: "What manager's employees do you want to view?",
                name: "managerID",
                type: "list",
                choices: managerList
            }
        ]);

        const results = await db.getEmployeesByManager(managerInfo);
        let empTable = cTable.getTable(results);
        console.log(empTable);
        loadMainPrompts();
    }
    catch (err) { console.log(err); }
}

// viewBudget - View the total utilized budget of a department -- ie the combined salaries of all employees in that department
async function viewBudget() {
    try {
        const departments = await db.getDepartments();
        const departmentList = departments.map( (department) => ({
            value: department.id,
            name: department.name})
        );

        const departmentInfo = await inquirer.prompt([
            {
                name: "departmentID",
                message: "What department do you want to see the budget for?",
                type: "list",
                choices: departmentList
            }
        ]);

        const results = await db.getDepartmentBudget(departmentInfo);
        let budgetTable = cTable.getTable(results);
        console.log(budgetTable);
        loadMainPrompts();
    }
    catch (err) { console.log(err); }
}

