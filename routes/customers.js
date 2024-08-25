// routes/customers.js
const express = require('express');
const auth = require('../middleware/auth');
const Customer = require('../models/Customer');
const router = express.Router();

// @route    GET /api/customers
// @desc     Get all customers
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST /api/customers
// @desc     Add new customer
// @access   Private
router.post('/', auth, async (req, res) => {
  const { name, contact, company, status, notes } = req.body;
  try {
    const newCustomer = new Customer({ name, contact, company, status, notes });
    const customer = await newCustomer.save();
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET /api/customers/:id
// @desc     Get customer by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT /api/customers/:id
// @desc     Update customer
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const { name, contact, company, status, notes } = req.body;
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });

    customer.name = name || customer.name;
    customer.contact = contact || customer.contact;
    customer.company = company || customer.company;
    customer.status = status || customer.status;
    customer.notes = notes || customer.notes;
    await customer.save();

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE /api/customers/:id
// @desc     Delete customer
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });

    await Customer.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Customer removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
