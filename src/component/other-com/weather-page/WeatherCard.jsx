import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { FaMapMarkerAlt, FaTemperatureHigh, FaSearch } from "react-icons/fa";

import {
	fetchWeather,
	fetchWeatherByCity,
} from "../../../redux/features/weatherSlice";
import { weatherBg } from "./utils/weatherBg";
import Clock from "./utils/Clock";

const WeatherCard = () => {
	const dispatch = useDispatch();
	const { data, loading } = useSelector((state) => state.weather, shallowEqual);

	const [city, setCity] = useState("");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			dispatch(
				fetchWeather({
					lat: pos.coords.latitude,
					lon: pos.coords.longitude,
				}),
			);
		});
	}, []);

	const bgClass = useMemo(
		() => weatherBg(data?.weather?.[0]?.description),
		[data],
	);

	return (
		<div className={`p-6 rounded-xl w-87.5 shadow-lg ${bgClass}`}>
			<h2 className="text-xl font-bold text-center mb-2">🌤 Weather App</h2>

			{/* Search */}
			<div className="flex gap-2 mb-4">
				<input
					className="flex-1 px-3 py-2 rounded bg-slate-700 text-white"
					placeholder="Search city..."
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<button
					onClick={() => city && dispatch(fetchWeatherByCity(city))}
					className="p-2 bg-blue-600 rounded"
				>
					<FaSearch />
				</button>
			</div>

			<Clock />

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
	);
};

export default React.memo(WeatherCard);
