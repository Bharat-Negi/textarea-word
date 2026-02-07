import axios from "axios";
import React, { useEffect, useState } from "react";

const LoopData = ({ search }) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const todoSearch = async () => {
			try {
				const res = await axios.get(
					"https://jsonplaceholder.typicode.com/todos",
				);
				const datafile = await res.data;
				// console.log(datafile);
				setData(datafile);
			} catch (error) {
				console.log(error);
			}
		};
		todoSearch();
	}, []);
	return (
		<div>
			<ul className="p-0">
				{data
					.filter((value) =>
						value.title.toLowerCase().includes(search.toLowerCase()),
					)
					.map((e) => {
						return <li key={e.id}>{e.title}</li>;
					})}
			</ul>
		</div>
	);
};

export default LoopData;
