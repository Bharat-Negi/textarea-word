import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { changePin } from "../../redux/features/atmSlice";

const ChangePin = () => {
	const [oldPin, setOldPin] = useState(["", "", "", ""]);
	const [newPin, setNewPin] = useState(["", "", "", ""]);
	const dispatch = useDispatch();

	const oldInputs = useRef([]);
	const newInputs = useRef([]);

	const handleDigitInput = (setPin, inputsRef, index, value) => {
		if (/^\d?$/.test(value)) {
			const newDigits = [...(setPin === setOldPin ? oldPin : newPin)];
			newDigits[index] = value;
			setPin(newDigits);

			// Move focus forward
			if (value && index < 3) {
				inputsRef.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (inputsRef, index, e) => {
		if (
			e.key === "Backspace" &&
			!(setPin === setOldPin ? oldPin : newPin)[index] &&
			index > 0
		) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	const handleSubmit = () => {
		const oldPinStr = oldPin.join("");
		const newPinStr = newPin.join("");

		if (oldPinStr.length === 4 && newPinStr.length === 4) {
			dispatch(changePin({ oldPin: oldPinStr, newPin: newPinStr }));
			setOldPin(["", "", "", ""]);
			setNewPin(["", "", "", ""]);
			oldInputs.current[0]?.focus();
		}
	};

	const isOldComplete = oldPin.every((d) => d !== "");
	const isNewComplete = newPin.every((d) => d !== "");
	const canSubmit =
		isOldComplete && isNewComplete && oldPin.join("") !== newPin.join("");

	return (
		<div className="max-w-md mx-auto p-4 bg-gray-500 rounded-2xl">
			<h2 className="text-2xl font-bold text-white mb-3">Change PIN</h2>

			{/* Current PIN */}
			<div className="mb-2">
				<label className="block text-gray-300 mb-3">Current PIN</label>
				<div className="flex gap-4">
					{[0, 1, 2, 3].map((i) => (
						<input
							key={`old-${i}`}
							ref={(el) => (oldInputs.current[i] = el)}
							type="password"
							className="w-14 h-14 text-center text-2xl bg-gray-800 text-white border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
							value={oldPin[i]}
							onChange={(e) =>
								handleDigitInput(setOldPin, oldInputs, i, e.target.value)
							}
							onKeyDown={(e) => handleKeyDown(oldInputs, i, e)}
							maxLength={1}
						/>
					))}
				</div>
				<p className="text-center text-sm text-gray-400 mt-2">
					{isOldComplete ? "✓ Current PIN set" : "Enter current 4-digit PIN"}
				</p>
			</div>

			{/* New PIN */}
			<div className="mb-2">
				<label className="block text-gray-300 mb-3">New PIN</label>
				<div className="flex gap-4">
					{[0, 1, 2, 3].map((i) => (
						<input
							key={`new-${i}`}
							ref={(el) => (newInputs.current[i] = el)}
							type="password"
							className={`w-14 h-14 text-center text-2xl bg-gray-800 text-white border rounded focus:outline-none ${
								isNewComplete && oldPin.join("") === newPin.join("")
									? "border-red-500 focus:border-red-500"
									: "border-gray-700 focus:border-green-500"
							}`}
							value={newPin[i]}
							onChange={(e) =>
								handleDigitInput(setNewPin, newInputs, i, e.target.value)
							}
							onKeyDown={(e) => handleKeyDown(newInputs, i, e)}
							maxLength={1}
						/>
					))}
				</div>
				<p className="text-center text-sm text-gray-400 mt-2">
					{isNewComplete ? "✓ New PIN set" : "Enter new 4-digit PIN"}
				</p>
			</div>

			{/* Status Indicators */}
			<div className="grid grid-cols-2 gap-4 mb-3">
				<div
					className={`p-3 rounded text-center ${isOldComplete ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-400"}`}
				>
					<div className="text-sm">Current</div>
					<div className="font-mono">
						{oldPin.map((d) => d || "•").join("")}
					</div>
				</div>
				<div
					className={`p-3 rounded text-center ${isNewComplete ? "bg-blue-900/30 text-blue-400" : "bg-gray-800 text-gray-400"}`}
				>
					<div className="text-sm">New</div>
					<div className="font-mono">
						{newPin.map((d) => d || "•").join("")}
					</div>
				</div>
			</div>

			{/* Submit Button */}
			<button
				onClick={handleSubmit}
				disabled={!canSubmit}
				className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
			>
				Update PIN
			</button>
		</div>
	);
};

export default ChangePin;
