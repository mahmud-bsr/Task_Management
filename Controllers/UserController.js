const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../Database/dbconfig');

// POST Register 
exports.registerUser = async (req, res) => {
    const { username, password, email, alamat, fotoprofil } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO user (username, password, email, alamat, fotoprofil) VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [username, hashedPassword, email, alamat, fotoprofil], (err, result) => {
        if (err) {
            res.status(500).send('Gagal register user');
        } else {
            res.status(201).send('Berhasil register User');
        }
    });
};
//POST Login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const sql = 'SELECT * FROM user WHERE username = ?';
        connection.query(sql, [username], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'Error logging in' });
            }
            if (results.length === 0) {
                return res.status(404).send({ error: 'User tidak ada' });
            }
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send({ error: 'password salah' });
            }

            // Create JWT token
            const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
            res.send({ token });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error logging in' });
    }
};

// GET all Users
exports.getAllUsers = (req, res) => {
    const sql = `SELECT * FROM user`;
    
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving users');
        } else {
            res.status(200).json(results);
        }
    });
};

// GET by ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM user WHERE id = ?`;
    
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving user');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(result[0]);
        }
    });
};

// PUT by ID
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, password, email, alamat, fotoprofil } = req.body;
    const sql = `UPDATE user SET username = ?, password = ?, email = ?, alamat = ?, fotoprofil = ? WHERE id = ?`;
    
    connection.query(sql, [username, password, email, alamat, fotoprofil, id], (err, result) => {
        if (err) {
            res.status(500).send('Error updating user');
        } else if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send('User updated successfully');
        }
    });
};

// DELETE by ID
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM user WHERE id = ?`;
    
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting user');
        } else if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send('User deleted successfully');
        }
    });
};
