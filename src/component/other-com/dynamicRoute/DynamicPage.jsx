import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DynamicPage = () => {
	const [user, setUser] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get(
					"https://jsonplaceholder.typicode.com/users",
				);
				// console.log(response.data);
				setUser(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		getData();
	}, []);

	if (!user) return <p>Loading...</p>;

	return (
		<>
			<div>
				<ul className="grid grid-cols-2 gap-4">
					{user.map((e) => {
						return (
							<li
								key={e.id}
								className="bg-gray-200 p-3 border border-gray-400 rounded"
							>
								{e.name}{" "}
								<span className="flex text-sm justify-between">
									goto page
									<Link to={`${e.id}`} className="text-blue-500">
										Read more
									</Link>
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default DynamicPage;
