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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        },

        )

        .then((res) => {
            // If 'View all departments' is chosen
            switch (res.chooseAction) {
                case 'View all departments':
                    viewDepartments();
                    break;
            }

            // If 'View all roles' is chosen
            switch (res.chooseAction) {
                case 'View all roles':
                    viewRoles();
                    break;
            }

            // If 'View all employees' is chosen
            switch (res.chooseAction) {
                case 'View all employees':
                    viewEmployees();
                    break;
            }

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

            // If 'Update an employee role' is chosen
            switch (res.chooseAction) {
                case 'Update an employee role':
                    updateRole();
                    break;
            }

        }
        )
}

// Response functions with nested child questions as needed
function viewDepartments() {
    inquirer
        .prompt({
            type: 'confirm',
            message: 'View all departments',
            name: 'viewDepartments'

        })
        .then((res) => {
            db.query(
                'SELECT * FROM department',
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
            type: 'confirm',
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

function viewEmployees() {
    inquirer
        .prompt({
            type: 'confirm',
            message: 'View all employees',
            name: 'viewEmployees',
        })
        .then((res) => {
            db.query(
                `SELECT 
                  employee.ID AS 'Employee ID',
                    employee.first_name AS 'First Name',
                    employee.last_name AS 'Last Name',
                    role.title AS Title,
                    role.salary AS Salary,
                    department.department AS Department,
                    CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager Name'
                FROM employee employee
                JOIN role role ON employee.role_id = role.id
                JOIN department department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`,

                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    questions();
                }
            )
        })
}

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
    db.query('SELECT * FROM role', (err, roles) => {
        if (err) console.log(err);
        roles = roles.map((role) => {
            return {
                name: role.title,
                value: role.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'New employee first name?',
                    name: 'firstName'
                },
                {
                    type: 'input',
                    message: 'New employee last name?',
                    name: 'lastName'
                },
                {
                    type: 'list',
                    message: 'New employee role?',
                    name: 'role',
                    choices: roles
                },
                {
                    type: 'list',
                    message: 'Who is the new manager?',
                    name: 'managerId',
                    choices: [1, 2, 3, 4, 5, 6, 7, 8]
                }
            ])
            .then((data) => {
                console.log(data.role);
                db.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        role_id: data.role,
                        manager_id: data.managerId
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('Employee added;');
                        viewEmployees();

                    }
                );
            });

    });

};




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