import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/atmSlice";
import { useState } from "react";
import Keypad from "./Keypad";

const Login = () => {
	const [pin, setPin] = useState("");
	const dispatch = useDispatch();
	const { message } = useSelector((state) => state.atm);

	return (
		<div>
			<input
				type="password"
				placeholder="Enter PIN"
				value={pin}
				onChange={(e) => setPin(e.target.value)}
				className="w-full p-2 mb-3 text-black bg-white"
			/>
			<Keypad
				onPress={(n) => pin.length < 4 && setPin(pin + n)}
				onClear={() => setPin("")}
				onEnter={() => dispatch(login(pin))}
			/>
			{/* <button
				onClick={() => dispatch(login(pin))}
				className="w-full bg-green-600 p-2 rounded"
			>
				ENTER
			</button> */}

			{message && <p className="mt-2 text-sm">{message}</p>}
		</div>
	);
};

export default Login;
