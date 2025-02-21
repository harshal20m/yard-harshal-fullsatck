import { useEffect, useState } from "react";
import { getBudgets } from "../api/api";

const CategoryDropdown = ({ value, onChange }) => {
	const [budgets, setBudgets] = useState([]);

	useEffect(() => {
		fetchBudgets();
	}, []);

	const fetchBudgets = async () => {
		try {
			const res = await getBudgets();
			setBudgets(res.data);
		} catch (error) {
			console.error("Error fetching budgets:", error);
		}
	};

	return (
		<select value={value} onChange={onChange} className="border p-2 w-full">
			<option value="">Select Category</option>
			{budgets.map((budget) => (
				<option key={budget._id} value={budget.category}>
					{budget.category} - Budget: ₹{budget.amount}
				</option>
			))}
		</select>
	);
};

export default CategoryDropdown;
