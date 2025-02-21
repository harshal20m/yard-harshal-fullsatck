require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

const transactionRoutes = require("../routes/transactions");
const categoryRoutes = require("../routes/categories");
const budgetRoutes = require("../routes/budgets");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/budgets", budgetRoutes);

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

module.exports = { app };
