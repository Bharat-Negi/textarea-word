import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import weatherReducer from "./features/weatherSlice";
import themeReducer from "./features/themeSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		weather: weatherReducer,
		theme: themeReducer,
	},
});
