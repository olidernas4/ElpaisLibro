//user.js
const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [userData.username, userData.password], callback);
  },

  findByUsername: (username, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], callback);
  },
};

module.exports = User;
