// Required references
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
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

// Prompt for questions
function questions() {
    inquirer
        .prompt({
            type: 'list',
            message: 'Please choose an action to perform:',
            name: 'chooseaction',
            choices: ['Add a department', 'Add a role', 'Add an employee', 'View all departments', 'View all employees', 'View all roles', 'Update an employee role', 'Exit'],
        })

        .then((res) => {
            switch (res.chooseaction) {
                case 'Add a department':
                    addDepartment();
                    break;
            }
        }
        )
}

// Answers functions
function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            message: 'What is the new department name?',
            name: 'departmentname',
        })
        .then((res) => {
            db.query(
                'INSERT INTO department SET ?',
                { department: res.departmentname },
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    questions();
                }
            )
        })
}