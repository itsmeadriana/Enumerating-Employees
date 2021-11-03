const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
const express = require('express');
const inputCheck = require('./utils/inputCheck');


const PORT = process.env.PORT || 3001;
const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

// Express middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Use apiRoutes
// app.use('/api', apiRoutes);

// GET all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET single department
app.get('/api/department/:id', (req, res) => {
    const sql = `SELECT * FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({
                error: err.message
            });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// DELETE a department
app.delete('/api/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({
                error: res.message
            });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// CREATE a department
app.post('/api/department', ({
    body
}, res) => {
    const errors = inputCheck(body, 'dept_name');
    if (errors) {
        res.status(400).json({
            error: errors
        });
        return;
    }

    const sql = `INSERT INTO department (id, dept_name) VALUES (?,?)`;
    const params = [body.dept_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({
                error: err.message
            });
            return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});

// Catchall for any other request (Not found)
app.use((req, res) => {
    res.status(404).end();
});



// Start server after db connection
// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// });