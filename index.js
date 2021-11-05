/* jshint esversion: 6 */
/* jshint esversion: 8 */
const cTable = require('console.table');
const db = require('./db/connection');

class Database
 {
        // constructor(db) {
    //     this.db = db;
    // }
//  Departments array
// let departmentsArray = [{
//     'Accounting': {
//         'dept_name': 'Accounting'
//     },
//     'Administration': {
//         'dept_name': 'Administration'
//     },
//     'Executive': {
//         'dept_name': 'Executive'
//     },
//     'Human Resources': {
//         'dept_name': 'Human Resources'
//     },
//     'Management': {
//         'dept_name': 'Management'
//     },
//     'Marketing': {
//         'dept_name': 'Marketing'
//     },
//     'Public Relations': {
//         'dept_name': 'Public Relations'
//     },
//     'Retail': {
//         'dept_name': 'Retail'
//     },
//     'Sales': {
//         'dept_name': 'Sales'
//     },
//     'Telecommunications': {
//         'dept_name': 'Telecommunications'
//     }
// }]

// GET departments table
    getDepartments() {
        // return this.db.promise().query(`SELECT * FROM department`);
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM department`;
            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                resolve(rows);
            });
        });
    }

// GET roles table
    getRoles() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT role.title, role.salary, department.dept_name FROM role LEFT JOIN department ON role.department_id = department.id`;
            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                resolve(rows);
            });
        });
    }

// GET employees table
    getEmployees() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM employee`;
            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                resolve(rows);
            });
        });
    }

// POST new department to department table
    addDepartment(newDeptName) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO department (dept_name) VALUES (?)`;
            const params = [newDeptName] ;

            db.query(sql, params, (err, result) =>{
                if (err) {
                    console.log(err.message);
                    return;
                }
                resolve(console.log(`${params} has been added to Departments.`));
            });
        });
    }

// POST new role to role table
    addRole(newRoleTitle, newRoleSalary, newRoleDeptId) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
            const params = [newRoleTitle, newRoleSalary, newRoleDeptId] ;

            db.query(sql, params, (err, result) =>{
                if (err) {
                    console.log(err.message);
                    return;
                }
                resolve(console.log(`${newRoleTitle} has been added to the database.`));
            });
        });
    }

// POST a new employee to employee table
    // addEmployee(newName, newLastName, new) {

    // }

}

module.exports = Database;