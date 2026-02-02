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
			<div className="my-3">
				<Link to="/">Home</Link>
			</div>
			<div>
				<ul>
					{user.map((e) => {
						return (
							<li key={e.id}>
								{e.name} ----- goto page <Link to={`${e.id}`}>Read more</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default DynamicPage;
