// routes/tickets.js
const express = require('express');
const auth = require('../middleware/auth');
const Ticket = require('../models/Ticket');
const router = express.Router();

// @route    GET /api/tickets
// @desc     Get all tickets
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('customer', 'name contact');
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST /api/tickets
// @desc     Create new ticket
// @access   Private
router.post('/', auth, async (req, res) => {
  const { customer, issue } = req.body;
  try {
    const newTicket = new Ticket({ customer, issue });
    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT /api/tickets/:id
// @desc     Update ticket status
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const { status, resolved_at } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

    ticket.status = status || ticket.status;
    ticket.resolved_at = resolved_at || ticket.resolved_at;
    await ticket.save();

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE /api/tickets/:id
// @desc     Delete ticket
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Ticket.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ msg: 'Ticket not found' });

    res.json({ msg: 'Ticket removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
