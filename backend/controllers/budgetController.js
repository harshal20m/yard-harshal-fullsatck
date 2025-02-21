const Budget = require("../models/Budget");

exports.getBudgets = async (req, res) => {
	try {
		const budgets = await Budget.find();
		res.json(budgets);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.addBudget = async (req, res) => {
	try {
		const { category, amount, month } = req.body;
		const budget = new Budget({ category, amount, month });
		await budget.save();
		res.status(201).json(budget);
	} catch (error) {
		res.status(400).json({ message: "Invalid data" });
	}
};

exports.updateBudget = async (req, res) => {
	try {
		const { amount } = req.body;
		const budget = await Budget.findByIdAndUpdate(req.params.id, { amount }, { new: true });
		res.json(budget);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.deleteBudget = async (req, res) => {
	try {
		await Budget.findByIdAndDelete(req.params.id);
		res.json({ message: "Budget deleted" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
