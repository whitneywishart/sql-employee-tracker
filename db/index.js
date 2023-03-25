// Required references
const inquirer = require('inquirer');
const fs = require('fs');

// Inquirer questions
inquirer
    .prompt([
        {
            type: 'list',
            message: 'Please choose an action to perform:',
            name: 'chooseaction',
            choices: ['Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'View all departments', 'View all employees', 'View all roles'],
        },
        {
            type: 'input',
            message: 'What color text would you like? Please enter a color name or hexadecimal code.',
            name: 'textcolor',
        },
        {
            type: 'list',
            message: 'What shape should your logo be? Please choose circle, triangle or square.',
            name: 'shapechoice',
            choices: ['Circle', 'Square', 'Triangle'],

        },
        {
            type: 'input',
            message: 'What background color would you like for your logo?',
            name: 'shapecolor'
        },
    ])

    .then((res) => {
        const svgDestination = './dist/logo.svg';
        console.log(res);

        let shape;
        if (res.shapechoice === 'Circle') {
            shape = new Circle(res.logotext, res.textcolor, res.shapecolor);
        } else if (res.shapechoice === 'Triangle') {
            shape = new Triangle(res.logotext, res.textcolor, res.shapecolor);
        } else if (res.shapechoice === 'Square') {
            shape = new Square(res.logotext, res.textcolor, res.shapecolor);
        }

        fs.writeFile(svgDestination, shape.render(), (err) =>
            err ? console.log(err) : console.log('Generated logo.svg')
        );
    });
