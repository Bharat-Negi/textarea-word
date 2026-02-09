import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, logout } from "../../redux/features/atmSlice";
import { useState } from "react";
import History from "./History";
import ChangePin from "./ChangePin";
import MiniStatement from "./MiniStatement";

const Dashboard = () => {
	const { currentUser } = useSelector((state) => state.atm);
	const dispatch = useDispatch();
	const [amount, setAmount] = useState("");

	return (
		<>
			<p>User: {currentUser.name}</p>
			<p>Balance: ₹{currentUser.balance}</p>

			<input
				type="number"
				placeholder="Amount"
				className="w-full p-2 my-2 text-black bg-white"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
			/>

			<button
				onClick={() => dispatch(deposit(Number(amount)))}
				className="w-full bg-blue-600 p-2 mb-2 rounded"
			>
				Deposit
			</button>

			<button
				onClick={() => dispatch(withdraw(Number(amount)))}
				className="w-full bg-yellow-600 p-2 mb-2 rounded"
			>
				Withdraw
			</button>

			<button
				onClick={() => dispatch(logout())}
				className="w-full bg-red-600 p-2 rounded"
			>
				Logout
			</button>

			<ChangePin />
			<History />
			<MiniStatement />
		</>
	);
};

export default Dashboard;
