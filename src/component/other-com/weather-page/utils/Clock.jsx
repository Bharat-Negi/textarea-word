import React, { useEffect, useState } from "react";
import { getDateTime } from "./dateTime";

const Clock = React.memo(() => {
	const [dateTime, setDateTime] = useState(getDateTime());

	useEffect(() => {
		const timer = setInterval(() => {
			setDateTime(getDateTime());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<>
			<p className="text-center text-sm text-gray-400">{dateTime.date}</p>
			<p className="text-center text-xl mb-4">{dateTime.time}</p>
		</>
	);
});

export default Clock;
