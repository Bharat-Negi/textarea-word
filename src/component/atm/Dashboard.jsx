import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, logout } from "../../redux/features/atmSlice";
import { useState } from "react";
import History from "./History";
import ChangePin from "./ChangePin";
import MiniStatement from "./MiniStatement";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
	const { currentUser } = useSelector((state) => state.atm);
	const dispatch = useDispatch();
	const [amount, setAmount] = useState("");

	return (
		<>
			<div className="flex gap-5">
				<div className="w-95 bg-black text-green-400 p-6 rounded-xl shadow-lg border-4 border-gray-700">
					<h1 className="text-center text-xl mb-4">🏧 ATM MACHINE</h1>
					<p>User: {currentUser.name}</p>
					<p>Balance: ₹{currentUser.balance}</p>

					<input
						type="number"
						placeholder="Amount"
						className="w-full p-2 my-2 text-black bg-white"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>

					<div className="flex gap-5">
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
					</div>
					<History />
					<MiniStatement />

					<button
						onClick={() => dispatch(logout())}
						className="w-full bg-red-600 p-2 rounded mt-3"
					>
						Logout
					</button>
				</div>
				<ChangePin />
			</div>

			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				// You can customize the toast container here
			/>
		</>
	);
};

export default Dashboard;
