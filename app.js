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
            when: ({ deptDash }) => {
                if ( deptDash === 'Add a new department') {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ])
    .then(async (input) => {
        const action = input.deptDash;

        if (action === 'Return to main menu') {
            return inquiries();
        }
        if (action === 'Quit') {
            return;
        }
        if (action === 'Add a new department') {
            await newDB.addDepartment(input.newDeptName);
        }
        return inquiries();
    });
};

const rolePrompts = async function () {
    return Inquirer
    .prompt([
        {
            type: 'list',
            name: 'roleDash',
            message: 'Please select a modification from the following list:',
            choices: ['Add a new role', 'Return to main menu', 'Quit'],
        },
        {
            type: 'input',
            name: 'newRoleTitle',
            message: 'Please enter the title of the role you wish to add to the database.',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('You cannot proceed without entering the title of the role you wish to add to the database. Please enter that name now.');
                    return false;
                }
            },
            when: ({ roleDash }) => {
                if ( roleDash === 'Add a new role') {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: 'Please enter the new role salary.',
            validate: input => {
                if (isNaN(input) || !input) {
                    console.log('Please enter a salary with numeric characters only.');
                    return false;
                }
                else {
                    return true;
                }
            },
            when: ({ roleDash }) => {
                if ( roleDash === 'Add a new role') {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'newRoleDeptId',
            message: 'Please select the new role department from the following list:',
            choices: [
                ({'name': 'Accounting', 'value': 1}),
                ({'name': 'Administration', 'value': 2}),
                ({'name': 'Executive', 'value': 3}),
                ({'name': 'Human Resources', 'value': 4}),
                ({'name': 'Management', 'value': 5}),
                ({'name': 'Marketing', 'value': 6}),
                ({'name': 'Public Relations', 'value': 7}),
                ({'name': 'Retail', 'value': 8}),
                ({'name': 'Sales', 'value': 9}),
                ({'name': 'Telecommunications', 'value': 10})
            ],
            when: ({ roleDash }) => {
                if ( roleDash === 'Add a new role') {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ])
    .then(async (input) => {
        const action = input.roleDash;

        if (action === 'Return to main menu') {
            return inquiries();
        }
        if (action === 'Quit') {
            return;
        }
        if (action === 'Add a new role') {
            await newDB.addRole(input.newRoleTitle, input.newRoleSalary, input.newRoleDeptId);
        }
        return inquiries();
    });
};

inquiries();