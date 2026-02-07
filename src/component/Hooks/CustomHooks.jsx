import { Link } from "react-router-dom";
import useFetch from "../../customehooks/useFetch";

const CustomHooks = () => {
	const data = useFetch("/json/data-file.json");

	return (
		<>
			<ul className="grid grid-cols-4 gap-3">
				{data.map((value, index) => {
					return (
						<li key={index} className="bg-gray-200 p-3 rounded ">
							{value.name}
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default CustomHooks;
