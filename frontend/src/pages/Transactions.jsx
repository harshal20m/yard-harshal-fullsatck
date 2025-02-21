import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { useState } from "react";

const Transactions = () => {
	const [refresh, setRefresh] = useState(false);

	return (
		<div className="p-4">
			<h1 className="text-2xl md:text-3xl font-bold mb-4">Transactions</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white">
					<thead className="bg-gray-50">
						<tr className="text-xs md:text-sm">{/* table headers */}</tr>
					</thead>
					<tbody className="text-sm md:text-base">{/* table rows */}</tbody>
				</table>
			</div>
			{/* Pagination */}
			<div className="mt-4 flex flex-col md:flex-row justify-between items-center">
				{/* pagination controls */}
			</div>
			<TransactionForm refresh={() => setRefresh(!refresh)} />
			<TransactionList refresh={refresh} />
		</div>
	);
};

export default Transactions;
