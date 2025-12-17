import React, { useState } from "react";
import { Link } from "react-router-dom";

const UseStateHook = () => {
	// normal call
	const [counter, setCounter] = useState(0);
	const [name, setName] = useState("");

	function increaseCounter() {
		setCounter(counter + 1);
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

	const handleObjNameChange = (e) => {
		setDetails((prev) => ({
			...prev,
			name: e.target.value,
		}));
	};

	return (
		<>
			<div className="my-3">
				<Link to="/">Home</Link>
			</div>
			{/* Primitive state example */}
			<div>
				<input type="text" onChange={(e) => setName(e.target.value)} />
				<h1>
					{name} has clicked {counter} times!!
				</h1>
				<button onClick={increaseCounter}>Increase</button>
			</div>

			<hr />

			{/* Object state example */}
			<div>
				<input type="text" onChange={handleObjNameChange} />
				<h1>
					{details.name} has clicked {details.objcounter} times!!
				</h1>
				<button onClick={increaseCounterObj}>Increase</button>
			</div>
		</>
	);
};

export default UseStateHook;
