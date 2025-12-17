import React, { useEffect, useState } from "react";

const useFetch = (url) => {
	const [responses, setResponses] = useState([]);

	const getdataFile = async () => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			setResponses(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		getdataFile();
	}, []);

	return responses;
};

export default useFetch;
