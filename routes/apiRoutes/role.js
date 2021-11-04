const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET all roles
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM role`;

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

// GET single role
router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM role WHERE id = ?`;
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

// DELETE a role
router.delete('/role/:id', (req, res) => {
    const sql = `DELETE FROM role WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({
                error: res.message
            });
        } else if (!result.affectedRows) {
            res.json({
                message: 'role not found'
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

// CREATE a role
router.post('/role', ({
    body
}, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if (errors) {
        res.status(400).json({
            error: errors
        });
        return;
    }

    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];

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

module.exports = router;