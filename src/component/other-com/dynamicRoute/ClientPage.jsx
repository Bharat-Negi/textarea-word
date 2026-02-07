import axios from "axios";
import { useEffect, useState } from "react";
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
			<div className="max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition">
				<h2 className="text-xl font-semibold text-gray-800 mb-2">
					{user.name}
				</h2>

				<p className="text-sm text-gray-500 mb-4">{user.company.catchPhrase}</p>

				<div className="space-y-2 text-sm text-gray-700">
					<p>
						<span className="font-medium text-gray-600">Email: </span>
						{user.email}
					</p>
					<p>
						<span className="font-medium text-gray-600">Phone: </span>
						{user.phone}
					</p>
					<p>
						<span className="font-medium text-gray-600">City: </span>
						{user.address.city}
					</p>
				</div>
			</div>
		</>
	);
};

export default ClientPage;
