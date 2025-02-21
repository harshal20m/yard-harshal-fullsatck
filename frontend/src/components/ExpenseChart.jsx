import { useEffect, useState } from "react";
import { getTransactions } from "../api/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseChart = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchTransactions = async () => {
			const res = await getTransactions();
			const grouped = res.data.reduce((acc, txn) => {
				const month = txn.date.slice(0, 7);
				acc[month] = (acc[month] || 0) + txn.amount;
				return acc;
			}, {});

			setData(Object.entries(grouped).map(([month, amount]) => ({ month, amount })));
		};

		fetchTransactions();
	}, []);

	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data}>
				<XAxis dataKey="month" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="amount" fill="#82ca9d" />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default ExpenseChart;
