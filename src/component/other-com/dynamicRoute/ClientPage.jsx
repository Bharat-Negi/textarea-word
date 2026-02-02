import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ClientPage = () => {
	const { id } = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					`https://jsonplaceholder.typicode.com/users/${id}`,
				);
				setUser(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUser();
	}, [id]);

	if (!user) return <p>Loading...</p>;

	return (
		<>
			<div className="my-3">
				<Link to="/dynamic-page">⬅ Back</Link>
			</div>

			<h2>{user.name}</h2>
			<small>{user.company.catchPhrase}</small>
			<p>Email: {user.email}</p>
			<p>Phone: {user.phone}</p>
			<p>City: {user.address.city}</p>
		</>
	);
};

export default ClientPage;
