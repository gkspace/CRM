const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['meeting', 'call', 'email'], required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String },
});

module.exports = mongoose.model('Interaction', InteractionSchema);