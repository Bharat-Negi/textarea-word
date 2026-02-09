import { useSelector } from "react-redux";

const MiniStatement = () => {
	const { currentUser } = useSelector((state) => state.atm);

	const download = () => {
		const lastFive = currentUser.history.slice(-5);
		let text = `Mini Statement - ${currentUser.name}\n\n`;

		lastFive.forEach((t) => {
			text += `${t.date} | ${t.type} | ₹${t.amount}\n`;
		});

		const blob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = "mini-statement.txt";
		a.click();
	};

	return (
		<button
			onClick={download}
			className="w-full bg-indigo-600 p-2 mt-3 rounded"
		>
			Download Mini Statement
		</button>
	);
};

export default MiniStatement;
