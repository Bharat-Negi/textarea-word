export const weatherBg = (weather) => {
	if (!weather) return "bg-slate-900";
	if (weather.includes("rain")) return "bg-blue-900";
	if (weather.includes("cloud")) return "bg-gray-800";
	if (weather.includes("clear")) return "bg-yellow-600";
	return "bg-slate-900";
};
