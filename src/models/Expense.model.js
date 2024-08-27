const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  date: { type: Date, default: Date.now }, // Date of the expense
});

module.exports = mongoose.model('Expense', expenseSchema);
