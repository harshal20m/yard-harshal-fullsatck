const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.find().sort({ date: -1 });
		res.json(transactions);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.addTransaction = async (req, res) => {
	try {
		const { amount, date, description, category } = req.body;
		const transaction = new Transaction({ amount, date, description, category });
		await transaction.save();
		res.status(201).json(transaction);
	} catch (error) {
		res.status(400).json({ message: "Invalid data" });
	}
};

exports.deleteTransaction = async (req, res) => {
	try {
		await Transaction.findByIdAndDelete(req.params.id);
		res.json({ message: "Transaction deleted" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
