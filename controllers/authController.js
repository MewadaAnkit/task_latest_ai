const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUsers, saveUsers } = require('../models/user.model');

// const SECRET = process.env.JWT_SECRET;

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  const users = await getUsers();
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), email, password: hashedPassword };
  users.push(newUser);
  await saveUsers(users);
  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const users = await getUsers();
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  console.log(user)
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ status:200,message:'successfully logged in', token });
};
