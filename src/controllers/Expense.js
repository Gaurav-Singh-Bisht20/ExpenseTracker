const Expense = require('../models/Expense.model')

const saveExpense = async (req, resp) => {
    const { title, category, amount, paidBy, date } = req.body;

    if (!title || !category || !amount || !paidBy) {
        return resp.status(403).json({
            success: false,
            message: 'All fields are required',
        });
    }

    try {
        const user = await User.findOne({ username: paidBy });
        if (!user) {
            return resp.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const newExpense = await Expense.create({
            title,
            category,
            amount,
            paidBy: user._id,
            date
        });

        return resp.status(200).json({
            success: true,
            message: 'Expense saved',
            newExpense
        });

    } catch (err) {
        console.error(err);
        return resp.status(500).json({
            success: false,
            message: 'Error saving expense',
        });
    }
};

module.exports = saveExpense;