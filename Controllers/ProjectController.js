const connection = require('../Database/dbconfig');

// POST
exports.createProject = (req, res) => {
    const { user_id, name, description, start_date, end_date } = req.body;
    const sql = `INSERT INTO project (user_id, name, description, start_date, end_date) VALUES (?, ?, ?, ?, ?)`;
    
    connection.query(sql, [user_id, name, description, start_date, end_date], (err, result) => {
        if (err) {
            res.status(500).send('Error creating project');
        } else {
            res.status(201).send('Project created successfully');
        }
    });
};

// GET
exports.getAllProjects = (req, res) => {
    const sql = `SELECT * FROM project`;
    
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving projects');
        } else {
            res.status(200).json(results);
        }
    });
};

// GET by ID
exports.getProjectById = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM project WHERE id = ?`;
    
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving project');
        } else if (result.length === 0) {
            res.status(404).send('Project not found');
        } else {
            res.status(200).json(result[0]);
        }
    });
};

// PUT by ID
exports.updateProject = (req, res) => {
    const { id } = req.params;
    const { name, description, start_date, end_date } = req.body;
    const sql = `UPDATE project SET name = ?, description = ?, start_date = ?, end_date = ? WHERE id = ?`;
    
    connection.query(sql, [name, description, start_date, end_date, id], (err, result) => {
        if (err) {
            res.status(500).send('Error updating project');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Project not found');
        } else {
            res.status(200).send('Project updated successfully');
        }
    });
};

// DELETE by ID
exports.deleteProject = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM project WHERE id = ?`;
    
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting project');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Project not found');
        } else {
            res.status(200).send('Project deleted successfully');
        }
    });
};
