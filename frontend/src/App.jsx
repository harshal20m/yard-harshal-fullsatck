import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";

function App() {
	return (
		<Router>
			<div className="relative">
				<Navbar />
				<div className="w-full min-h-screen p-4 md:p-6 lg:p-8 relative z-0">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/transactions" element={<Transactions />} />
						<Route path="/budget" element={<Budget />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
