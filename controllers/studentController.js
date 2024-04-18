// const asyncHandler = require('express-async-handler');
// const pool = require('../config/dbConnection'); // Use the pool from dbConnection.js

// const studentController = {
//     // Get all students for the logged-in user
//     getStudents: asyncHandler(async (req, res) => {
//         pool.query('SELECT * FROM students WHERE user_id = ?', [req.user.id], (error, results) => {
//             if (error) {
//                 console.error("Error fetching students:", error);
//                 return res.status(500).json({ message: error.message });
//             }
//             console.log("Fetched students:", results);
//             res.json(results);
//         });
//     }),

//     // Get a specific student by ID
//     getStudent: asyncHandler(async (req, res) => {
//         pool.query('SELECT * FROM students WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], (error, results) => {
//             if (error) {
//                 console.error("Error fetching student:", error);
//                 return res.status(500).json({ message: error.message });
//             }
//             if (results.length === 0) {
//                 return res.status(404).json({ message: 'Student not found' });
//             }
//             console.log("Fetched student:", results[0]);
//             res.json(results[0]);
//         });
//     }),

//     // Create a new student
//     createStudent: asyncHandler(async (req, res) => {
//         const { name, email, assignment } = req.body;
//         if (!name || !email || !assignment) {
//             return res.status(400).json({ message: 'Please provide name, email, and assignment details!' });
//         }
//         pool.query('INSERT INTO students (name, email, assignment, user_id) VALUES (?, ?, ?, ?)', 
//         [name, email, assignment, req.user.id], (error, results) => {
//             if (error) {
//                 console.error("Error creating student:", error);
//                 return res.status(500).json({ message: error.message });
//             }
//             console.log("Student created successfully:", results);
//             res.status(201).json({ id: results.insertId, name, email, assignment });
//         });
//     }),

//     // Update a student's information
//     updateStudent: asyncHandler(async (req, res) => {
//         const { name, email, assignment } = req.body;
//         pool.query('UPDATE students SET name = ?, email = ?, assignment = ? WHERE id = ? AND user_id = ?', 
//         [name, email, assignment, req.params.id, req.user.id], (error, results) => {
//             if (error) {
//                 console.error("Error updating student:", error);
//                 return res.status(500).json({ message: error.message });
//             }
//             if (results.affectedRows === 0) {
//                 return res.status(404).json({ message: 'Student not found or no update was made' });
//             }
//             console.log("Student updated successfully:", results);
//             res.json({ message: 'Student updated successfully', id: req.params.id, name, email, assignment });
//         });
//     }),

//     // Delete a student
//     deleteStudent: asyncHandler(async (req, res) => {
//         pool.query('DELETE FROM students WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], (error, results) => {
//             if (error) {
//                 console.error("Error deleting student:", error);
//                 return res.status(500).json({ message: error.message });
//             }
//             if (results.affectedRows === 0) {
//                 return res.status(404).json({ message: 'Student not found' });
//             }
//             console.log("Student deleted successfully:", results);
//             res.json({ message: 'Student deleted successfully' });
//         });
//     })
// };

// module.exports = studentController;









const pool = require('../config/dbConnection'); // Use the pool from dbConnection.js

const studentController = {
    // Get all students for the logged-in user
    getStudents: (req, res) => {
        // pool.query('SELECT * FROM students WHERE user_id = ?', [req.user.id], (error, results) => {
            pool.query('SELECT * FROM students WHERE id = ?', [req.user.id], (error, results) => {
                if (error) {
                console.error("Error fetching students:", error);
                return res.status(500).json({ message: error.message });
            }
            console.log("Fetched students:", results);
            res.json(results);
        });
    },

    // Get a specific student by ID
    getStudent: (req, res) => {
        pool.query('SELECT * FROM students WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], (error, results) => {
            if (error) {
                console.error("Error fetching student:", error);
                return res.status(500).json({ message: error.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Student not found' });
            }
            console.log("Fetched student:", results[0]);
            res.json(results[0]);
        });
    },

    // Create a new student
    createStudent: (req, res) => {
        console.log(req.body);
        const { name, email, assignment } = req.body;
        if (!name || !email || !assignment) {
            return res.status(400).json({ message: 'Please provide name, email, and assignment details!' });
        }
        pool.query('INSERT INTO students (name, email, assignment) VALUES (?, ?, ?)',
        [name, email, assignment, req.user.id], (error, results) => {
            if (error) {
                console.error("Error creating student:", error);
                return res.status(500).json({ message: error.message });
            }
            console.log("Student created successfully:", results);
            res.status(201).json({ id: results.insertId, name, email, assignment });
        });
    },

    // Update a student's information
    updateStudent: (req, res) => {
        const { name, email, assignment } = req.body;
        pool.query('UPDATE students SET name = ?, email = ?, assignment = ? WHERE id = ? AND user_id = ?', 
        [name, email, assignment, req.params.id, req.user.id], (error, results) => {
            if (error) {
                console.error("Error updating student:", error);
                return res.status(500).json({ message: error.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Student not found or no update was made' });
            }
            console.log("Student updated successfully:", results);
            res.json({ message: 'Student updated successfully', id: req.params.id, name, email, assignment });
        });
    },

    // Delete a student
    deleteStudent: (req, res) => {
        pool.query('DELETE FROM students WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], (error, results) => {
            if (error) {
                console.error("Error deleting student:", error);
                return res.status(500).json({ message: error.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Student not found' });
            }
            console.log("Student deleted successfully:", results);
            res.json({ message: 'Student deleted successfully' });
        });
    }
};

module.exports = studentController;
