import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherByCity = createAsyncThunk(
	"weather/fetchWeatherByCity",
	async (city) => {
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
		);
		return res.data;
	},
);

export const fetchWeather = createAsyncThunk(
	"weather/fetchWeather",
	async ({ lat, lon }) => {
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
		);
		return res.data;
	},
);

export const fetchForecast = createAsyncThunk(
	"weather/fetchForecast",
	async ({ lat, lon }) => {
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
		);
		return res.data;
	},
);

const weatherSlice = createSlice({
	name: "weather",
	initialState: {
		data: null,
		loading: false,
		error: null,
		forecast: [],
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchWeatherByCity.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchWeatherByCity.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchForecast.fulfilled, (state, action) => {
				state.forecast = action.payload.list.filter((_, i) => i % 8 === 0);
			})
			.addCase(fetchForecast.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default weatherSlice.reducer;
