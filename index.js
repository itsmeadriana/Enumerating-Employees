/* jshint esversion: 6 */
/* jshint esversion: 8 */
const cTable = require('console.table');
const db = require('./db/connection');

class Database
 {
        // constructor(db) {
    //     this.db = db;
    // }

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
            const sql = `SELECT * FROM role`;
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

    addDepartment(newDeptName) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO department (dept_name) VALUES ('?')`;
            const params = newDeptName ;

            db.query(sql, (err, result) =>{
                if (err) {
                    console.log(err.message);
                    return;
                }
                resolve(console.log(`${params} has been added to Departments.`));
            });
        });
    }

}

module.exports = Database;