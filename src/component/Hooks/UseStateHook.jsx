import { useState } from "react";

const UseStateHook = () => {
	// normal call
	const [counter, setCounter] = useState(0);
	const [name, setName] = useState("");

	function increaseCounter() {
		setCounter((prev) => prev + 1);
		setCounter((prev) => prev + 1);
	}
	function decreaseCounter() {
		setCounter(counter - 1);
	}

	// object as state variable
	const [details, setDetails] = useState({
		objcounter: 0,
		name: "",
	});

	const increaseCounterObj = () => {
		setDetails((prev) => ({
			...prev,
			objcounter: prev.objcounter + 1,
		}));
	};

	const decreaseCounterObj = () => {
		setDetails((prev) => ({
			...prev,
			objcounter: prev.objcounter - 1,
		}));
	};

	const handleObjNameChange = (e) => {
		setDetails((prev) => ({
			...prev,
			name: e.target.value,
		}));
	};

	return (
		<>
			{/* Primitive state example */}
			<div>
				<input
					value={name}
					type="text"
					onChange={(e) => setName(e.target.value)}
					className="border"
				/>
				<h1>
					{name} has clicked {counter} times!!
				</h1>
				<button
					className="bg-red-500 py-1 px-2 rounded text-white mr-2"
					onClick={increaseCounter}
				>
					Increase
				</button>
				<button
					className="bg-green-500 py-1 px-2 rounded text-white"
					onClick={decreaseCounter}
				>
					Decrease
				</button>
			</div>

			<hr className="my-5" />

			{/* Object state example */}
			<div>
				<input
					value={details.name}
					type="text"
					onChange={handleObjNameChange}
					className="border"
				/>
				<h1>
					{details.name} has clicked {details.objcounter} times!!
				</h1>
				<button
					className="bg-green-500 py-1 px-2 rounded text-white mr-2"
					onClick={increaseCounterObj}
				>
					Increase
				</button>
				<button
					className="bg-red-500 py-1 px-2 rounded text-white"
					onClick={decreaseCounterObj}
				>
					Increase
				</button>
			</div>
		</>
	);
};

export default UseStateHook;
