// models/Customer.js
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  company: { type: String },
  status: { type: String, enum: ['lead', 'customer'], default: 'lead' },
  notes: { type: String },
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interaction' }],
});

module.exports = mongoose.model('Customer', CustomerSchema);