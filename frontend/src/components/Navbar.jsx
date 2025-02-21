import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const navLinks = [
		{ path: "/", label: "Dashboard" },
		{ path: "/transactions", label: "Transactions" },
		{ path: "/budget", label: "Budget" },
	];

	return (
		<nav className="bg-white shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link to="/" className="text-xl md:text-2xl font-bold">
							Finance Tracker
						</Link>
					</div>
					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-4">
						{navLinks.map((link) => (
							<Link key={link.path} to={link.path} className="px-3 py-2 rounded-md hover:bg-gray-100">
								{link.label}
							</Link>
						))}
					</div>
					{/* Mobile menu button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
						>
							{isOpen ? (
								<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>
			{/* Mobile menu dropdown */}
			<div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
				<div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
					{navLinks.map((link) => (
						<Link
							key={link.path}
							to={link.path}
							className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
							onClick={() => setIsOpen(false)}
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
