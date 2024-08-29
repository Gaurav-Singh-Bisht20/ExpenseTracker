const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
  trackerName :{type : String, required : true},
  uniqueLink : { type : String, required: true, unique: true},
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users in the team
  currentMonthExpenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }], // Expenses for the current month
  history: [
    {
      month: { type: String }, // Month-Year format, e.g., "August-2024"
      totalExpense: { type: Number }, // Total expenses for that month
      expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }] // Array of expenses in that month
    }
  ]
});

module.exports = mongoose.model('Tracker', trackerSchema);
