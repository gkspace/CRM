// routes/interactions.js
const express = require('express');
const auth = require('../middleware/auth');
const Interaction = require('../models/Interaction');
const router = express.Router();

// @route    GET /api/interactions
// @desc     Get all interactions
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const interactions = await Interaction.find().populate('customer user', 'name email');
    res.json(interactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST /api/interactions
// @desc     Add new interaction
// @access   Private
router.post('/', auth, async (req, res) => {
  const { customer, user, type, notes } = req.body;
  try {
    const newInteraction = new Interaction({ customer, user, type, notes });
    const interaction = await newInteraction.save();
    res.json(interaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET /api/interactions/:id
// @desc     Get interaction by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const interaction = await Interaction.findById(req.params.id).populate('customer user', 'name email');
    if (!interaction) return res.status(404).json({ msg: 'Interaction not found' });
    res.json(interaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
