// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// @route    GET /api/auth
// @desc     Test route to check if the Auth API is working
// @access   Public
router.get('/', (req, res) => {
  res.json({ msg: 'Auth API is working. Use /register to create a user, /login to authenticate, and /user to get user details.' });
});

// @route    GET /api/auth/register
// @desc     Get description of the /register endpoint
// @access   Public
router.get('/register', (req, res) => {
  res.json({ msg: 'POST /register to create a new user. Requires name, email, password, and role (optional). Returns a JWT token on successful registration.' });
});

// @route    POST /api/auth/register
// @desc     Register a user
// @access   Public
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password, role });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ msg: 'User registered successfully', token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET /api/auth/login
// @desc     Get description of the /login endpoint
// @access   Public
router.get('/login', (req, res) => {
  res.json({ msg: 'POST /login to authenticate a user. Requires email and password. Returns a JWT token on successful authentication.' });
});

// @route    POST /api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ msg: 'Login successful', token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET /api/auth/user
// @desc     Get description of the /user endpoint
// @access   Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ msg: 'User details fetched successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
