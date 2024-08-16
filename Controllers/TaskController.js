const connection = require('../Database/dbconfig');

// POST
exports.createTask = (req, res) => {
    const { project_id, title, description, status, due_date } = req.body;
    const sql = `INSERT INTO task (project_id, title, description, status, due_date) VALUES (?, ?, ?, ?, ?)`;
    
    connection.query(sql, [project_id, title, description, status, due_date], (err, result) => {
        if (err) {
            res.status(500).send('Error creating task');
        } else {
            res.status(201).send('Task created successfully');
        }
    });
};

// GET
exports.getAllTasks = (req, res) => {
    const sql = `SELECT * FROM task`;
    
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving tasks');
        } else {
            res.status(200).json(results);
        }
    });
};

// GET by ID
exports.getTaskById = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM task WHERE id = ?`;
    
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving task');
        } else if (result.length === 0) {
            res.status(404).send('Task not found');
        } else {
            res.status(200).json(result[0]);
        }
    });
};

// PUT by ID
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    const sql = `UPDATE task SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?`;
    
    connection.query(sql, [title, description, status, due_date, id], (err, result) => {
        if (err) {
            res.status(500).send('Error updating task');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Task not found');
        } else {
            res.status(200).send('Task updated successfully');
        }
    });
};

// DELETE by ID
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM task WHERE id = ?`;
    
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting task');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Task not found');
        } else {
            res.status(200).send('Task deleted successfully');
        }
    });
};
