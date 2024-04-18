// const db = require('./config/dbConnection');

// const StudentModel = {
//   findAll: async (userId) => {
//     const sql = 'SELECT * FROM students WHERE user_id = ?';
//     const [students] = await db.query(sql, [userId]);
//     return students;
//   },

//   findById: async (id, userId) => {
//     const sql = 'SELECT * FROM students WHERE id = ? AND user_id = ? LIMIT 1';
//     const [students] = await db.query(sql, [id, userId]);
//     return students.length ? students[0] : null;
//   },

//   create: async (studentData) => {
//     const { name, email, assignment, user_id } = studentData;
//     const sql = 'INSERT INTO students (name, email, assignment, user_id) VALUES (?, ?, ?, ?)';
//     const [result] = await db.query(sql, [name, email, assignment, user_id]);
//     return { id: result.insertId, ...studentData };
//   },

//   update: async (id, studentData) => {
//     const { name, email, assignment } = studentData;
//     const sql = 'UPDATE students SET name = ?, email = ?, assignment = ? WHERE id = ?';
//     const [result] = await db.query(sql, [name, email, assignment, id]);
//     return result.affectedRows > 0;
//   },

//   delete: async (id, userId) => {
//     const sql = 'DELETE FROM students WHERE id = ? AND user_id = ?';
//     const [result] = await db.query(sql, [id, userId]);
//     return result.affectedRows > 0;
//   }
// };

// module.exports = StudentModel;
const db = require('./config/dbConnection');

const StudentModel = {
  findAll: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM students WHERE user_id = ?';
      db.query(sql, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  findById: (id, userId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM students WHERE id = ? AND user_id = ? LIMIT 1';
      db.query(sql, [id, userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results[0] : null);
        }
      });
    });
  },

  create: (studentData) => {
    return new Promise((resolve, reject) => {
      const { name, email, assignment, user_id } = studentData;
      const sql = 'INSERT INTO students (name, email, assignment, user_id) VALUES (?, ?, ?, ?)';
      db.query(sql, [name, email, assignment, user_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: result.insertId, ...studentData });
        }
      });
    });
  },

  update: (id, studentData) => {
    return new Promise((resolve, reject) => {
      const { name, email, assignment } = studentData;
      const sql = 'UPDATE students SET name = ?, email = ?, assignment = ? WHERE id = ?';
      db.query(sql, [name, email, assignment, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  },

  delete: (id, userId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM students WHERE id = ? AND user_id = ?';
      db.query(sql, [id, userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
};

module.exports = StudentModel;
