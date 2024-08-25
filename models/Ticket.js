const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  issue: { type: String, required: true },
  status: { type: String, enum: ['open', 'resolved'], default: 'open' },
  created_at: { type: Date, default: Date.now },
  resolved_at: { type: Date },
});

module.exports = mongoose.model('Ticket', TicketSchema);