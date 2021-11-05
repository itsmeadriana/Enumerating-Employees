/* jshint esversion: 6 */
/* jshint esversion: 8 */


const Inquirer = require('inquirer');
const cTable = require('console.table');
const Database = require('./index');
const newDB = new Database;

const inquiries = async function () {
    return Inquirer
    .prompt([{
            type: 'list',
            name: 'dashboard',
            message: 'Please select an action from the following list:',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'Quit']
        }])
        .then(async (input) => {
            const action = input.dashboard;
            if (action === 'View all departments') {
                await newDB.getDepartments().then((input) => {
                    console.table(input);
                });
            }
            if (action === 'View all roles') {
                await newDB.getRoles().then((input) => {
                    console.table(input);
                });
            }
            if (action === 'View all employees') {
                await newDB.getEmployees().then((input) => {
                    console.table(input);
                });
            }
            if (action === 'Add department') {
                console.log('You are now being redirected to Departments.');
                return departmentPrompts();
            }
            if (action === 'Add role') {
                console.log('You are now being redirected to Roles.');
                return rolePrompts();
            }
            if (action === 'Add employee') {
                console.log('You are now being redirected to Employees.');
                return employeePrompts();
            }
            if (action === 'Update employee role') {
                console.log('You are now being redirected to Employees.');
                return employeePrompts();
            }
            if (action === 'Quit') {
                return;
            }
            return inquiries();
        });
};

const departmentPrompts = async function () {
    // const departmentsMenu = await Database.getDepartments();
    return Inquirer
    .prompt([
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
        }
    ])
    .then(async (input) => {
        const action = input;

        if (action === 'Return to main menu') {
            return inquiries();
        }
        if (action === 'Quit') {
            return;
        }
        if (action.newDeptName) {
            await newDB.addDepartment(input.newDeptName);
        }

        return departmentPrompts();
    });
};


inquiries();