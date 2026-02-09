import { useSelector } from "react-redux";
import Login from "./Login";
import Dashboard from "./Dashboard";

const ATM = () => {
	const { currentUser } = useSelector((state) => state.atm);

	return (
		<div className="w-95 bg-black text-green-400 p-6 rounded-xl shadow-lg border-4 border-gray-700">
			<h1 className="text-center text-xl mb-4">🏧 ATM MACHINE</h1>
			{currentUser ? <Dashboard /> : <Login />}
		</div>
	);
};

export default ATM;
