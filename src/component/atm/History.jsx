import { useSelector } from "react-redux";

const History = () => {
	const { currentUser } = useSelector((state) => state.atm);

	// Format ISO date to readable format
	const formatDate = (dateString) => {
		try {
			const date = new Date(dateString);
			// Format: DD MMM YY, hh:mm AM/PM
			return date.toLocaleString("en-IN", {
				day: "2-digit",
				month: "short",
				year: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			});
		} catch {
			return dateString;
		}
	};

	return (
		<div className="mt-4 text-sm">
			<h3 className="mb-1 text-white font-medium">📜 Transactions</h3>
			{currentUser.history.length === 0 && (
				<p className="text-gray-400">No transactions</p>
			)}
			<div className="space-y-2">
				{currentUser.history
					.slice() // Create a copy to avoid mutating original
					.reverse() // Show newest first
					.map((t, i) => (
						<div key={i} className="p-2 bg-gray-800/50 rounded">
							<p className="text-white">
								<span
									className={
										t.type === "Deposit" ? "text-green-400" : "text-red-400"
									}
								>
									{t.type} ₹{t.amount}
								</span>
								<span className="text-gray-400 ml-2">
									— {formatDate(t.date)}
								</span>
							</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default History;
