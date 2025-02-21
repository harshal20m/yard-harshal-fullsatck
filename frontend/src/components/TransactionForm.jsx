import { useState } from "react";
import { addTransaction } from "../api/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategoryDropdown from "./CategoryDropdown";
import { Card, CardContent } from "@/components/ui/card";

const TransactionForm = ({ refresh }) => {
	const [formData, setFormData] = useState({ amount: "", date: "", description: "", category: "" });

	const handleSubmit = async (e) => {
		e.preventDefault();
		await addTransaction(formData);
		setFormData({ amount: "", date: "", description: "", category: "" });
		refresh();
	};

	return (
		<Card className="max-w-lg mx-auto p-6 shadow-lg rounded-lg">
			<h2 className="text-xl font-bold text-center mb-4">Add Transaction</h2>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						type="number"
						placeholder="Amount"
						value={formData.amount}
						onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
						required
						className="w-full p-2 border rounded-lg"
					/>
					<Input
						type="date"
						value={formData.date}
						onChange={(e) => setFormData({ ...formData, date: e.target.value })}
						required
						className="w-full p-2 border rounded-lg"
					/>
					<Input
						type="text"
						placeholder="Description"
						value={formData.description}
						onChange={(e) => setFormData({ ...formData, description: e.target.value })}
						required
						className="w-full p-2 border rounded-lg"
					/>
					<CategoryDropdown
						value={formData.category}
						onChange={(e) => setFormData({ ...formData, category: e.target.value })}
					/>
					<Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
						Add Transaction
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default TransactionForm;
