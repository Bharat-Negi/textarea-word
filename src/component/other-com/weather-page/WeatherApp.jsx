import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMapMarkerAlt, FaTemperatureHigh } from "react-icons/fa";
import { getDateTime } from "./utils/dateTime";
import {
	fetchWeather,
	fetchWeatherByCity,
} from "../../../redux/features/weatherSlice";

import { toggleTheme } from "../../../redux/features/themeSlice";
import { weatherBg } from "./utils/weatherBg";
import { FaMoon, FaSun, FaSearch } from "react-icons/fa";

const WeatherApp = () => {
	const dispatch = useDispatch();
	const { data, loading } = useSelector((state) => state.weather);
	const [dateTime, setDateTime] = useState(getDateTime());
	const { mode } = useSelector((s) => s.theme);
	const [city, setCity] = useState("");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			dispatch(
				fetchWeather({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				}),
			);
		});

		const timer = setInterval(() => {
			setDateTime(getDateTime());
		}, 1000);

		return () => clearInterval(timer);
	}, [dispatch]);

	return (
		<div className="flex items-center justify-center">
			<div
				className={`transition-all bg-slate-800 p-6 rounded-xl w-87.5 shadow-lg ${
					mode === "dark" ? "bg-black text-white" : "bg-white text-black"
				} ${weatherBg(data?.weather[0]?.description)}`}
			>
				{/* Header */}
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-xl font-bold">Weather</h1>
					<button onClick={() => dispatch(toggleTheme())}>
						{mode === "dark" ? <FaSun /> : <FaMoon />}
					</button>
				</div>

				{/* Search */}
				<div className="flex gap-2 mb-4">
					<input
						className="flex-1 px-3 py-2 rounded bg-slate-700 text-white"
						placeholder="Search city..."
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
					<button
						onClick={() => dispatch(fetchWeatherByCity(city))}
						className="p-2 bg-blue-600 rounded"
					>
						<FaSearch />
					</button>
				</div>

				<h1 className="text-2xl font-bold text-center mb-4">🌤 Weather App</h1>

				<p className="text-center text-sm text-gray-400">{dateTime.date}</p>
				<p className="text-center text-xl mb-4">{dateTime.time}</p>

				{loading && <p className="text-center">Loading...</p>}

				{data && (
					<>
						<div className="flex items-center justify-center gap-2 mb-2">
							<FaMapMarkerAlt />
							<span>
								{data.name}, {data.sys.country}
							</span>
						</div>

						<div className="flex items-center justify-center gap-2 text-4xl font-bold">
							<FaTemperatureHigh />
							{Math.round(data.main.temp)}°C
						</div>

						<p className="text-center capitalize mt-2">
							{data.weather[0].description}
						</p>

						<div className="flex justify-between text-sm mt-4">
							<p>Humidity: {data.main.humidity}%</p>
							<p>Wind: {data.wind.speed} km/h</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default WeatherApp;
