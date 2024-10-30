//authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  User.create({ username, password: hashedPassword }, (err) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: 'User created successfully' });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json(err);
    if (!results.length || !bcrypt.compareSync(password, results[0].password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  });
};
