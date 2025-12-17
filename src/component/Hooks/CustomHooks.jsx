import { Link } from "react-router-dom";
import useFetch from "../../customehooks/useFetch";

const CustomHooks = () => {
	const data = useFetch("/json/data-file.json");

	return (
		<>
			<div className="my-3">
				<Link to="/">Home</Link>
			</div>
			<ul>
				{data.map((value, index) => {
					return <li key={index}>{value.name}</li>;
				})}
			</ul>
		</>
	);
};

export default CustomHooks;
