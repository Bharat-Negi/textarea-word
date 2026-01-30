import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	decrement,
	increment,
	incrementByAmount,
} from "../../../redux/features/counterSlice";

const ReduxCom = () => {
	const [num, setNum] = useState(0);

	const dispatch = useDispatch();
	const count = useSelector((state) => state.counter.value);

	return (
		<>
			<div className="my-3">
				<Link to="/">Home</Link>
			</div>

			<h1>{count}</h1>
			<div className="flex gap-3 mb-4">
				<button
					className="py-2 px-3 bg-blue-500 text-white rounded"
					onClick={() => dispatch(increment())}
				>
					Add Number by 1
				</button>
				<button
					className="py-2 px-3 bg-blue-500 text-white rounded"
					onClick={() => dispatch(decrement())}
				>
					Minus Number by 1
				</button>
			</div>
			<div className="flex gap-3">
				<input
					type="number"
					value={num}
					onChange={(e) => {
						setNum(e.target.value);
					}}
					className="border rounded border-gray-800 px-3"
				/>
				<button
					className="py-2 px-3 bg-blue-500 text-white rounded"
					onClick={() => dispatch(incrementByAmount(Number(num)))}
				>
					Add Number by input
				</button>
			</div>
		</>
	);
};

export default ReduxCom;
