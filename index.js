// Required references
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
inquirer.registerPrompt("table", require("./index"));
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'HolgFrag77,,,',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

questions();

// Prompt for parent questions
function questions() {
    inquirer
        .prompt({
            type: 'list',
            message: 'Please choose an action to perform:',
            name: 'chooseAction',
            choices: ['Add a department', 'Add a role', 'Add an employee', 'View all departments', 'View all employees', 'View all roles', 'Update an employee role', 'Exit'],
        },

        )

        .then((res) => {
            // If 'Add a department' is chosen
            switch (res.chooseAction) {
                case 'Add a department':
                    addDepartment();
                    break;
            }
            // If 'Add a role' is chosen
            switch (res.chooseAction) {
                case 'Add a role':
                    addRole();
                    break;
            }
            // If 'Add an employee' is chosen
            switch (res.chooseAction) {
                case 'Add an employee':
                    addEmployee();
                    break;
            }
            // If 'View all departments' is chosen
            switch (res.chooseAction) {
                case 'View all departments':
                    viewDepartments();
                    break;
            }
            // If 'View all employees' is chosen
            switch (res.chooseAction) {
                case 'View all employees':
                    viewEmployees();
                    break;
            }
            // If 'View all roles' is chosen
            switch (res.chooseAction) {
                case 'View all roles':
                    viewRoles();
                    break;
            }
            // If 'Update an employee role' is chosen
            switch (res.chooseAction) {
                case 'Update an employee role':
                    updateRole();
                    break;
            }
                        // If 'Exit' is chosen
            switch (res.chooseAction) {
                case 'Exit':
                    exit();
                    break;
            }
        }
        )
}

// Response functions with nested child questions as needed
function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            message: 'What is the new department name?',
            name: 'newDepartmentName',
        })
        .then((res) => {
            db.query(
                'INSERT INTO department SET ?',
                { department: res.newDepartmentName },
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    questions();
                }
            )
        })
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the new role title?',
                name: 'title',
            },

        ])
        .then((res) => {
            db.query(
                'INSERT INTO role SET ?',
                { title: res.title },
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    questions();
                }
            );
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "firstName",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lastName",
            },

        ])
        .then((res) => {
            const employeeQuery = "INSERT INTO employee SET ?";
            const employeeData = {
                first_name: res.firstName,
                last_name: res.lastName,
            };
            db.query(employeeQuery, employeeData, (err, res) => {
                if (err) throw err;
                console.table(res);
                questions();
            });
        });
};


function viewDepartments() {
    inquirer
        .prompt({
            type: 'list',
            message: 'View all departments',
            name: 'viewDepartments',

        })
        .then((res) => {
            db.query(
                'SELECT * FROM departments',
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    questions();
                }
            )
        })
}

function viewEmployees() {
    inquirer
        .prompt({
            type: 'input',
            message: 'View all employees',
            name: 'viewEmployees',
        })
        .then((res) => {
            db.query(
                'SELECT * FROM employee',
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    questions();
                }
            )
        })
}

function viewRoles() {
    inquirer
        .prompt({
            type: 'input',
            message: 'View all roles',
            name: 'viewRoles',
        })
        .then((res) => {
            db.query(
                'SELECT * FROM role',
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    questions();
                }
            )
        })
}

function updateRole() {
    inquirer
        .prompt({
            type: "input",
            message: "What role would you like to update?",
            name: "updateRole"
        })
        .then((res) => {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the new role title?",
                        name: "newRoleTitle",
                    },
                ])
                .then((res2) => {
                    db.query(
                        "UPDATE role SET title=? WHERE title=?",
                        [res2.newRoleTitle, res.updateRole],
                        (err, result) => {
                            if (err) throw err;
                            console.log(result.affectedRows + " role updated");
                            questions();
                        }
                    )
                })
        })
}

function exit() {
    questions();
}