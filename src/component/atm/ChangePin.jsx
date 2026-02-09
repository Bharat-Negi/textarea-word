import { useDispatch } from "react-redux";
import { useState } from "react";
import { changePin } from "../../redux/features/atmSlice";

const ChangePin = () => {
	const [oldPin, setOldPin] = useState("");
	const [newPin, setNewPin] = useState("");
	const dispatch = useDispatch();

	return (
		<div className="mt-4">
			<input
				placeholder="Old PIN"
				className="w-full p-2 mb-1 text-black bg-white"
				value={oldPin}
				onChange={(e) => setOldPin(e.target.value)}
			/>
			<input
				placeholder="New PIN"
				className="w-full p-2 mb-2 text-black bg-white"
				value={newPin}
				onChange={(e) => setNewPin(e.target.value)}
			/>
			<button
				onClick={() => dispatch(changePin({ oldPin, newPin }))}
				className="w-full bg-purple-600 p-2 rounded"
			>
				Change PIN
			</button>
		</div>
	);
};

export default ChangePin;
