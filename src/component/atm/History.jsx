import { useSelector } from "react-redux";

const History = () => {
	const { currentUser } = useSelector((state) => state.atm);

	return (
		<div className="mt-4 text-sm">
			<h3 className="mb-1">📜 Transactions</h3>
			{currentUser.history.length === 0 && <p>No transactions</p>}
			{currentUser.history.map((t, i) => (
				<p key={i}>
					{t.type} ₹{t.amount} — {t.date}
				</p>
			))}
		</div>
	);
};

export default History;
