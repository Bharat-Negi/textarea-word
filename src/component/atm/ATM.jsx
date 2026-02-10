import { useSelector } from "react-redux";
import Login from "./Login";
import Dashboard from "./Dashboard";

const ATM = () => {
	const { currentUser } = useSelector((state) => state.atm);

	return <>{currentUser ? <Dashboard /> : <Login />}</>;
};

export default ATM;
