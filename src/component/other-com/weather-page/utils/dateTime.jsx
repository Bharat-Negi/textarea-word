export const getDateTime = () => {
	const now = new Date();

	return {
		time: now.toLocaleTimeString(),
		date: now.toLocaleDateString("en-IN", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		}),
	};
};
