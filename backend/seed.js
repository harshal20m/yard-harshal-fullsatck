require("dotenv").config();
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction");
const Category = require("./models/Category");
const Budget = require("./models/Budget");
const connectDB = require("./config/db");

// Function to generate a random date from the current or previous month
const getRandomDate = () => {
	const now = new Date();
	const currentMonth = now.getMonth();
	const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
	const year = now.getFullYear();

	// Randomly decide if the date should be from the current or previous month
	const month = Math.random() > 0.5 ? currentMonth : previousMonth;
	const day = Math.floor(Math.random() * 28) + 1; // Avoid issues with months having 30/31 days

	return new Date(year, month, day);
};

const seedData = async () => {
	await connectDB();

	// Clear existing data
	await Transaction.deleteMany();
	await Category.deleteMany();
	await Budget.deleteMany();

	// Insert categories
	const categories = await Category.insertMany([
		{ name: "Food" },
		{ name: "Transport" },
		{ name: "Entertainment" },
		{ name: "Rent" },
		{ name: "Utilities" },
		{ name: "Shopping" },
		{ name: "Healthcare" },
		{ name: "Savings" },
		{ name: "Education" },
		{ name: "Miscellaneous" },
	]);

	// Insert transactions with random dates
	await Transaction.insertMany([
		{
			amount: 50,
			date: getRandomDate(),
			description: "Groceries",
			category: "Food",
			paymentMethod: "Credit Card",
			location: "Walmart",
		},
		{
			amount: 20,
			date: getRandomDate(),
			description: "Uber Ride",
			category: "Transport",
			paymentMethod: "Debit Card",
			location: "Downtown",
		},
		{
			amount: 100,
			date: getRandomDate(),
			description: "Dinner at Restaurant",
			category: "Food",
			paymentMethod: "Cash",
			location: "Olive Garden",
		},
		{
			amount: 2000,
			date: getRandomDate(),
			description: "Monthly Rent",
			category: "Rent",
			paymentMethod: "Bank Transfer",
			location: "Apartment Complex",
		},
		{
			amount: 80,
			date: getRandomDate(),
			description: "Electricity Bill",
			category: "Utilities",
			paymentMethod: "Online Payment",
			location: "Power Company",
		},
		{
			amount: 40,
			date: getRandomDate(),
			description: "Movie Tickets",
			category: "Entertainment",
			paymentMethod: "Credit Card",
			location: "Cinema",
		},
		{
			amount: 150,
			date: getRandomDate(),
			description: "Clothes Shopping",
			category: "Shopping",
			paymentMethod: "Debit Card",
			location: "Mall",
		},
		{
			amount: 300,
			date: getRandomDate(),
			description: "Doctor Consultation",
			category: "Healthcare",
			paymentMethod: "Insurance",
			location: "City Hospital",
		},
		{
			amount: 500,
			date: getRandomDate(),
			description: "Tuition Fees",
			category: "Education",
			paymentMethod: "Bank Transfer",
			location: "University",
		},
		{
			amount: 25,
			date: getRandomDate(),
			description: "Coffee",
			category: "Miscellaneous",
			paymentMethod: "Cash",
			location: "Starbucks",
		},
	]);

	// Insert budgets
	await Budget.insertMany([
		{ category: "Food", amount: 400, month: "February" },
		{ category: "Transport", amount: 150, month: "February" },
		{ category: "Entertainment", amount: 200, month: "February" },
		{ category: "Rent", amount: 2000, month: "February" },
		{ category: "Utilities", amount: 300, month: "February" },
		{ category: "Shopping", amount: 250, month: "February" },
		{ category: "Healthcare", amount: 500, month: "February" },
		{ category: "Savings", amount: 1000, month: "February" },
		{ category: "Education", amount: 800, month: "February" },
		{ category: "Miscellaneous", amount: 100, month: "February" },
	]);

	console.log("✅ Sample data added successfully!");
	process.exit();
};

seedData();
