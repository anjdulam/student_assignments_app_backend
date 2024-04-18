// const db = require('./config/dbConnection');

// const UserModel = {
//   findAll: async () => {
//     const sql = 'SELECT * FROM users';
//     const [users] = await db.query(sql);
//     return users;
//   },

//   findByEmail: async (email) => {
//     const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
//     const [users] = await db.query(sql, [email]);
//     return users.length ? users[0] : null;
//   },

//   findById: async (id) => {
//     const sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';
//     const [users] = await db.query(sql, [id]);
//     return users.length ? users[0] : null;
//   },

//   create: async (userData) => {
//     const { username, email, password } = userData;
//     const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//     const [result] = await db.query(sql, [username, email, password]);
//     return { id: result.insertId, username, email };
//   },

//   update: async (id, userData) => {
//     const { username, email, password } = userData;
//     const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
//     const [result] = await db.query(sql, [username, email, password, id]);
//     return result.affectedRows > 0;
//   },

//   delete: async (id) => {
//     const sql = 'DELETE FROM users WHERE id = ?';
//     const [result] = await db.query(sql, [id]);
//     return result.affectedRows > 0;
//   }
// };

// module.exports = UserModel;







const db = require('./config/dbConnection');

const UserModel = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users';
      db.query(sql, (err, users) => {
        if (err) reject(err);
        else resolve(users);
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
      db.query(sql, [email], (err, users) => {
        if (err) reject(err);
        else resolve(users.length ? users[0] : null);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';
      db.query(sql, [id], (err, users) => {
        if (err) reject(err);
        else resolve(users.length ? users[0] : null);
      });
    });
  },

  create: (userData) => {
    return new Promise((resolve, reject) => {
      const { username, email, password } = userData;
      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(sql, [username, email, password], (err, result) => {
        if (err) reject(err);
        else resolve({ id: result.insertId, username, email });
      });
    });
  },

  update: (id, userData) => {
    return new Promise((resolve, reject) => {
      const { username, email, password } = userData;
      const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
      db.query(sql, [username, email, password, id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM users WHERE id = ?';
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0);
      });
    });
  }
};

module.exports = UserModel;
