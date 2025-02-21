import { useEffect, useState } from "react";
import { getTransactions, getBudgets } from "../api/api";
import { Card, CardContent } from "@/components/ui/card";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
} from "recharts";

const Dashboard = () => {
	const [transactions, setTransactions] = useState([]);
	const [budgets, setBudgets] = useState([]);
	const [categorySpending, setCategorySpending] = useState({});
	const [totalSpent, setTotalSpent] = useState(0);
	const [totalBudget, setTotalBudget] = useState(0);
	const [spendingTrend, setSpendingTrend] = useState([]);

	useEffect(() => {
		fetchTransactions();
		fetchBudgets();
	}, []);

	// Fetch Transactions
	const fetchTransactions = async () => {
		try {
			const res = await getTransactions();
			setTransactions(res.data);

			const spendingMap = {};
			let total = 0;
			const trendData = {};

			res.data.forEach((t) => {
				spendingMap[t.category] = (spendingMap[t.category] || 0) + t.amount;
				total += t.amount;

				const date = new Date(t.date).toLocaleDateString();
				trendData[date] = (trendData[date] || 0) + t.amount;
			});

			setCategorySpending(spendingMap);
			setTotalSpent(total);

			setSpendingTrend(
				Object.keys(trendData).map((date) => ({
					date,
					amount: trendData[date],
				}))
			);
		} catch (error) {
			console.error("Error fetching transactions:", error);
		}
	};

	// Fetch Budgets
	const fetchBudgets = async () => {
		try {
			const res = await getBudgets();
			setBudgets(res.data);

			const total = res.data.reduce((sum, budget) => sum + budget.amount, 0);
			setTotalBudget(total);
		} catch (error) {
			console.error("Error fetching budgets:", error);
		}
	};

	// Prepare data for Bar Chart
	const budgetChartData = budgets.map((budget) => ({
		category: budget.category,
		budget: budget.amount,
		spent: categorySpending[budget.category] || 0,
	}));

	// Prepare data for Pie Chart (Category Spending Distribution)
	const pieChartData = Object.keys(categorySpending).map((category) => ({
		name: category,
		value: categorySpending[category],
	}));

	// Pie chart colors
	const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ff4563"];

	return (
		<div className="p-4">
			<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">📊 Dashboard</h1>

			{/* Key Metrics Summary */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
				<Card className="p-4 shadow-md">
					<CardContent className="text-center">
						<h3 className="text-lg font-semibold">Total Spent</h3>
						<p className="text-2xl font-bold text-red-500">₹{totalSpent}</p>
					</CardContent>
				</Card>
				<Card className="p-4 shadow-md">
					<CardContent className="text-center">
						<h3 className="text-lg font-semibold">Total Budget</h3>
						<p className="text-2xl font-bold text-blue-500">₹{totalBudget}</p>
					</CardContent>
				</Card>
				<Card className="p-4 shadow-md">
					<CardContent className="text-center">
						<h3 className="text-lg font-semibold">Savings</h3>
						<p className="text-2xl font-bold text-green-500">₹{Math.max(totalBudget - totalSpent, 0)}</p>
					</CardContent>
				</Card>
			</div>

			{/* Budget Cards with Custom Progress Bars */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
				{budgets.map((budget) => {
					const spent = categorySpending[budget.category] || 0;
					const remaining = budget.amount - spent;
					const progress = Math.min((spent / budget.amount) * 100, 100);

					return (
						<Card key={budget._id} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
							<CardContent>
								<h3 className="text-lg font-semibold">{budget.category}</h3>
								<p className="text-sm text-gray-500">
									Spent: <span className="text-red-500">₹{spent}</span> / ₹{budget.amount}
								</p>

								{/* Custom Progress Bar */}
								<div className="w-full bg-gray-300 h-2 rounded-full mt-2">
									<div
										className="h-2 rounded-full transition-all duration-300"
										style={{
											width: `${progress}%`,
											backgroundColor:
												progress > 80 ? "#ff4563" : progress > 50 ? "#ffc658" : "#82ca9d",
										}}
									></div>
								</div>

								<p className="text-sm mt-2">
									Remaining: <span className="text-green-500">₹{remaining}</span>
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Charts Section */}
			<div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Budget vs Actual Spending (Bar Chart) */}
				<div className="border p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-4">💰 Budget vs Actual Spending</h3>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={budgetChartData}>
							<XAxis dataKey="category" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="budget" fill="#8884d8" name="Budget" />
							<Bar dataKey="spent" fill="#82ca9d" name="Spent" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Spending Trend (Line Chart) */}
				<div className="border p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-4">📈 Spending Trend</h3>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={spendingTrend}>
							<XAxis dataKey="date" />
							<YAxis />
							<Tooltip />
							<Line type="monotone" dataKey="amount" stroke="#ff4563" strokeWidth={2} />
						</LineChart>
					</ResponsiveContainer>
				</div>

				{/* Category Spending Distribution (Pie Chart) */}
				<div className="border p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-4">📊 Spending Distribution</h3>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={100}>
								{pieChartData.map((_, index) => (
									<Cell key={index} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
