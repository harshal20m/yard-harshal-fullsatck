import { useEffect, useState } from "react";
import { getBudgets, addBudget, deleteBudget } from "../api/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Budget = () => {
	const [budgets, setBudgets] = useState([]);
	const [formData, setFormData] = useState({ category: "", amount: "", month: new Date().toISOString().slice(0, 7) });

	// Fetch budgets
	const fetchBudgets = async () => {
		try {
			const res = await getBudgets();
			setBudgets(res.data);
		} catch (error) {
			toast.error("Error fetching budgets!");
			console.error("Error fetching budgets:", error);
		}
	};

	useEffect(() => {
		fetchBudgets();
	}, []);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.category || !formData.amount) {
			toast.warning("Please enter a category and amount!");
			return;
		}
		try {
			await addBudget(formData);
			toast.success("Budget added successfully!");
			fetchBudgets();
			setFormData({ category: "", amount: "", month: new Date().toISOString().slice(0, 7) });
		} catch (error) {
			toast.error("Error adding budget!");
			console.error("Error adding budget:", error.response?.data || error.message);
		}
	};

	// Delete a budget entry
	const handleDelete = async (id) => {
		try {
			await deleteBudget(id);
			toast.success("Budget deleted successfully!");
			fetchBudgets();
		} catch (error) {
			toast.error("Error deleting budget!");
			console.error("Error deleting budget:", error);
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h1 className="text-2xl md:text-3xl font-bold text-center mb-6">💰 Budget Planning</h1>

			{/* Budget form & Summary */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="p-4 md:p-6">
					<h2 className="text-lg font-semibold mb-4">Add Budget</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<Input
							type="text"
							placeholder="Category"
							value={formData.category}
							onChange={(e) => setFormData({ ...formData, category: e.target.value })}
							required
						/>
						<Input
							type="number"
							placeholder="Amount"
							value={formData.amount}
							onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
							required
						/>
						<Input
							type="month"
							value={formData.month}
							onChange={(e) => setFormData({ ...formData, month: e.target.value })}
						/>
						<Button type="submit" className="w-full">
							Add Budget
						</Button>
					</form>
				</Card>

				<Card className="p-4 md:p-6">
					<img src="https://media.giphy.com/media/cJFQJzZxFMhONxDTnt/giphy.gif" alt="Budget GIF" />
				</Card>
			</div>

			{/* Budget List */}
			<div className="mt-8">
				<h2 className="text-lg font-semibold mb-4">📊 Budget List</h2>
				{budgets.length > 0 ? (
					<Card className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Category</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Month</TableHead>
									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{budgets.map((budget) => (
									<TableRow key={budget._id}>
										<TableCell>{budget.category}</TableCell>
										<TableCell>₹{budget.amount}</TableCell>
										<TableCell>{budget.month}</TableCell>
										<TableCell>
											<Button
												variant="destructive"
												size="sm"
												onClick={() => handleDelete(budget._id)}
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Card>
				) : (
					<p className="text-gray-500 text-center">No budgets added yet.</p>
				)}
			</div>
		</div>
	);
};

export default Budget;
