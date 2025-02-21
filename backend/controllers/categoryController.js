const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		res.json(categories);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.addCategory = async (req, res) => {
	try {
		const { name } = req.body;
		const category = new Category({ name });
		await category.save();
		res.status(201).json(category);
	} catch (error) {
		res.status(400).json({ message: "Invalid data" });
	}
};
