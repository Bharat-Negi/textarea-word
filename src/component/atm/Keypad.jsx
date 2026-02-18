const Keypad = ({ onPress, onClear, onEnter }) => {
	const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

	return (
		<div className="grid grid-cols-3 gap-2 mt-4">
			{keys.map((k) => (
				<button
					key={k}
					onClick={() => onPress(k)}
					className="bg-gray-700 p-3 rounded text-white active:scale-95"
				>
					{k}
				</button>
			))}

			<button
				onClick={onClear}
				className="bg-yellow-600 text-white p-3 rounded col-span-2 active:scale-95"
			>
				CLEAR
			</button>
			<button
				onClick={onEnter}
				className="bg-green-600 text-white p-3 rounded col-span-3 active:scale-95"
			>
				ENTER
			</button>
		</div>
	);
};

export default Keypad;
