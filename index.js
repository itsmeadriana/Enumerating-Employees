/* jshint esversion: 6 */
/* jshint esversion: 8 */
const cTable = require('console.table');
const db = require('./db/connection');

class Database
 {
        constructor(db) {
        this.db = db;
    }

// GET departments table
    getDepartments() {
        // return this.db.promise().query(`SELECT * FROM department`);
        return new Promise((resolve, reject) => {
            const sql = `SELECT distinct department.dept_name FROM department ORDER BY dept_name ASC`;
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
            const sql = `SELECT distinct role.title, role.salary, department.dept_name FROM role LEFT JOIN department ON role.department_id = department.id`;
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

            //SELF JOIN using table aliases e and m for employee and manager, respectively. COALESCE data fields with new column ids. CONCATENATE WITH SEPARATOR to return concatenated string (managers' first and last names). FROM table alias e, LEFT JOIN employee role_id with matching foreign key, role.id; LEFT JOIN role department_id with matching foreign key, department.id; LEFT JOIN table alias m on table alias e's manager id with matching manager id in table alias m.

            const sql = `SELECT e.id, e.first_name, e.last_name,
            COALESCE(role.salary, 'N/A') AS salary,
            COALESCE(role.title, 'N/A') AS title,
            COALESCE(department.dept_name, 'N/A') AS department_name,
            CONCAT_WS(' ', m.first_name, m.last_name) AS manager
            FROM employee e
            LEFT JOIN role on e.role_id = role.id
            LEFT JOIN department on role.department_id = department.id
            LEFT JOIN employee m ON e.manager_id = m.id`;

            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                resolve(rows);
            });
        });
    }

// GET dept_names only
    getDepartmentNamesOnly() {
        console.log('wHY ME');
        return new Promise ((resolve, reject) => {
            const sql = `SELECT department.dept_name FROM department`;
            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                const departmentsArray = rows.map(object => object.dept_name);
                resolve(departmentsArray);
            });
        });
    }

// GET department ids only
    getDepartmentIdsOnly(department) {
        return new Promise ((resolve, reject) => {
            const sql = `SELECT id FROM department where department.dept_name = ?`;
            const params = department;
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                const departmentsArray = rows.map(object => object.id);
                resolve(departmentsArray);
            });
        });
    }

// GET role titles only
    getRoleTitlesOnly() {
        return new Promise ((resolve, reject) => {
            const sql = `SELECT role.title FROM role`;
            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                const rolesArray = rows.map(object => object.title);
                resolve(rolesArray);
            });
        });
    }

// GET role ids only
    getRoleIdsOnly(role) {
        return new Promise ((resolve, reject) => {
            const sql = `SELECT id FROM role where role.title = ?`;
            const params = role;
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                const rolesArray = rows.map(object => object.id);
                resolve(rolesArray);
            });
        });
    }

// GET managers only
    getManagersOnly() {
        return new Promise ((resolve, reject) => {
            const sql = `SELECT DISTINCT CONCAT_WS('', m.first_name, m.last_name) AS managers
            FROM employee e
            LEFT JOIN employee m on e.manager_id = m.id`;

            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                const managersArray = rows.map(object => object.managers);
                resolve(managersArray);
            });
        });
    }

// POST new department to department table
    async addDepartment(newDeptName) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO department (dept_name) VALUES (?)`;
            const params = newDeptName ;

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
    async addRole(newRoleTitle, newRoleSalary, newRoleDeptId) {
        const departmentId = await this.getDepartmentIdsOnly(newRoleDeptId);
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
            const params = [newRoleTitle, newRoleSalary, departmentId] ;

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
    async addEmployee(newEmployeeFirstName, newEmployeeLastName, newEmployeeRoleId, newEmployeeManagerId) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES (?,?,?)`;
            const params = [newEmployeeFirstName, newEmployeeLastName, newEmployeeRoleId, newEmployeeManagerId] ;

            db.query(sql, params, (err, result) =>{
                if (err) {
                    console.log(err.message);
                    return;
                }
                resolve(console.log(`${newEmployeeFirstName} ${newEmployeeLastName}  has been added to the database.`));
            });
        });
    }

}

module.exports = Database;