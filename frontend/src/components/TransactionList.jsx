import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "../api/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const formatDate = (isoString) => {
	const date = new Date(isoString);
	return date.toLocaleDateString("en-US", {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

const formatTime = (isoString) => {
	const date = new Date(isoString);
	return date.toLocaleString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

const TransactionList = ({ refresh }) => {
	const [transactions, setTransactions] = useState([]);

	const fetchTransactions = async () => {
		try {
			const res = await getTransactions();
			setTransactions(res.data);
		} catch (error) {
			console.error("Error fetching transactions:", error);
		}
	};

	useEffect(() => {
		fetchTransactions();
	}, [refresh]);

	const handleDelete = async (id) => {
		try {
			await deleteTransaction(id);
			fetchTransactions();
		} catch (error) {
			console.error("Error deleting transaction:", error);
		}
	};

	// Group transactions by date
	const groupedTransactions = transactions.reduce((acc, txn) => {
		const date = formatDate(txn.date);
		if (!acc[date]) acc[date] = [];
		acc[date].push(txn);
		return acc;
	}, {});

	return (
		<div className="max-w-lg mx-auto space-y-6">
			<h2 className="text-xl font-bold text-center mb-4">Transaction History</h2>
			{Object.keys(groupedTransactions).map((date) => (
				<div key={date}>
					<h3 className="text-lg font-semibold text-gray-700 mb-2">{date}</h3>
					{groupedTransactions[date].map((txn) => (
						<Card key={txn._id} className="p-4 shadow-md rounded-lg mb-2 hover:shadow-lg transition">
							<CardContent className="flex justify-between items-center">
								<div>
									<p className="text-sm font-medium">{txn.description}</p>
									<p className="text-xs text-gray-500">{txn.category}</p>
								</div>
								<div className="text-right">
									<p className="text-sm font-bold text-green-600">₹{txn.amount}</p>
									<p className="text-xs text-gray-500">{formatTime(txn.date)}</p>
								</div>
								<Button variant="destructive" size="sm" onClick={() => handleDelete(txn._id)}>
									Delete
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			))}
		</div>
	);
};

export default TransactionList;
