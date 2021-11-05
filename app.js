/* jshint esversion: 6 */
/* jshint esversion: 8 */

const Database = require('./index');
const Inquirer = require('inquirer');
const cTable = require('console.table');
const newDB = new Database();

const inquiries = async function () {
    Inquirer.prompt([
        {
            type: 'list',
            name: 'dashboard',
            message: 'Please select an action from the following list:',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'Quit']
        }
    ])
    .then(async (input) => {
        const action = input.dashboard;
        if (action === 'View all departments') {
            Database.getDepartments().then((input) => {
                console.table(input);
            });
        }
        if (action === 'View all roles') {
            Database.getRoles().then((input) => {
                console.table(input);
            });
        }
        if (action === 'View all employees') {
            Database.getEmployees().then((input) => {
                console.table(input);
            });
        }
        if (action === 'Add department') {
            departmentPrompts().then((input) => {
                console.log('You are now being redirected to Departments.');
            });
        }
        if (action === 'Add role') {
            rolePrompts().then((input) => {
                console.log('You are now being redirected to Roles.');
            });
        }
        if (action === 'Add employee') {
            employeePrompts().then((input) => {
                console.log('You are now being redirected to Employees.');
            });
        }
        if (action === 'Update employee role') {
            employeePrompts().then((input) => {
                console.log('You are now being redirected to Employees.');
            });
        }
        if (action === 'Quit') {
            return;
        }
        return inquiries();
    });
};

const departmentPrompts = async function () {
    const departmentsMenu = await newDB.getDepartments();
    Inquirer.prompt([
        {
            type: 'list',
            name: 'deptDash',
            message: 'Please select a modification from the following list:',
            choices: ['Add a new department', 'Return to main menu'],
        },
        {
            type: 'input',
            name: 'newDeptName',
            message: 'Please enter the name of the department you wish to add to the database.',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('You cannot proceed without entering the name of the department you wish to add to the database. Please enter that name now.');
                    return false;
                }
            },
            when: ({ deptDash }) => {
                if (deptDash === 'Add a new department') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
    .then(async (input) => {
        const action = input;
        if (action == 'Add a new department') {
            await newDB.addDepartment(input);
        }
        if (action === 'Return to main menu') {
            return inquiries();
        }
        if (action === 'Quit') {
            return;
        }
    });
    return departmentsMenu();
};


inquiries();