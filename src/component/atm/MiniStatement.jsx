import { useSelector } from "react-redux";

const MiniStatement = () => {
	const { currentUser } = useSelector((state) => state.atm);

	const isDisabled = !currentUser?.history || currentUser.history.length === 0;

	const formatDate = (dateString) => {
		try {
			const date = new Date(dateString);
			return {
				date: date.toLocaleDateString("en-IN", {
					day: "2-digit",
					month: "short",
					year: "numeric",
				}),
				time: date.toLocaleTimeString("en-IN", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}),
			};
		} catch {
			return { date: dateString, time: "" };
		}
	};

	const download = () => {
		if (!currentUser?.history) return;

		// Get last 5 transactions sorted by date (newest first)
		const lastFive = [...currentUser.history]
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, 5);

		let text = `Mini Statement - ${currentUser.name}\n`;
		text += `Account Balance: ₹${currentUser.balance}\n`;
		text += `Generated: ${new Date().toLocaleString()}\n\n`;
		text += `Date & Time           Type       Amount\n`;
		text += `─────────────────────────────────────────\n`;

		lastFive.forEach((t) => {
			const { date, time } = formatDate(t.date);
			const type = t.type.padEnd(9, " ");
			const amount = `₹${t.amount}`.padStart(10, " ");
			text += `${date} ${time.padEnd(8, " ")} ${type} ${amount}\n`;
		});

		const blob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = `${currentUser.name}_statement.txt`;
		a.click();

		URL.revokeObjectURL(url);
	};

	return (
		<button
			onClick={download}
			className={`w-full bg-linear-to-r from-indigo-600 to-purple-600 p-3 mt-3 rounded font-medium text-white ${
				isDisabled
					? "opacity-50 cursor-not-allowed"
					: "hover:from-indigo-700 hover:to-purple-700"
			}`}
			disabled={isDisabled}
		>
			Download Last 5 Transactions
		</button>
	);
};

export default MiniStatement;
