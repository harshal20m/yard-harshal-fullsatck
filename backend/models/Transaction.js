const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
	amount: { type: Number, required: true },
	date: { type: Date, required: true },
	description: { type: String },
	category: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
