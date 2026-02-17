import React, { useEffect, useState } from "react";
import axios from "axios";

const MultipleApiCall = () => {
	let proLimit = 5;
	const [data1, setData1] = useState([]);
	const [data2, setData2] = useState([]);
	const [data3, setData3] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchAllData = async () => {
			setLoading(true);
			setError(false);

			try {
				// Option 2: Using Promise.all (cleaner modern approach)
				const [usersResponse, commentsResponse, otherUserResponse] =
					await Promise.all([
						axios.get(`https://dummyjson.com/users/?limit=${proLimit}`),
						axios.get(`https://dummyjson.com/comments/?limit=${proLimit}`),
						axios.get(`https://dummyjson.com/users/?limit=${proLimit}`),
					]);

				setData1(usersResponse.data.users);
				setData2(commentsResponse.data.comments || []);
				setData3(otherUserResponse.data.users);
			} catch (err) {
				console.error("Failed to fetch data:", err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchAllData();
	}, []);

	console.log(data3);

	// Handle loading state
	if (loading) return <div>Loading data...</div>;

	// Handle error state
	if (error) return <div>Error loading data. Please try again.</div>;

	return (
		<div>
			<h1>Multiple API Calls Demo</h1>

			<section>
				<h2>Users ({data1.length})</h2>
				<ul>
					{data1.map((user) => (
						<li key={`users-${user.id}`}>
							<strong>{user.firstName} </strong> - {user.role}
						</li>
					))}
				</ul>
			</section>
			<hr className="my-2" />
			<section>
				<h2>Comments ({data2.length})</h2>
				<ul>
					{data2?.map((comment) => (
						<li key={`comment-${comment.id}`}>
							{comment.user.fullName} - {comment.body}
						</li>
					))}
				</ul>
			</section>
			<hr className="my-2" />
			<section>
				<h2>Comments ({data3.length})</h2>
				<ul>
					{data3?.map((userTwo) => (
						<li key={`userTwo-${userTwo.id}`}>
							<strong>{userTwo.company.name} </strong> - {userTwo.eyeColor}
						</li>
					))}
				</ul>
			</section>
			<div className="mb-5"></div>
		</div>
	);
};

export default MultipleApiCall;
