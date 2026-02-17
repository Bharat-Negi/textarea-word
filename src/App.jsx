import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./pages/home";
import CustomHooks from "./component/Hooks/CustomHooks";
import UseStateHook from "./component/Hooks/UseStateHook";
import AddNote from "./component/other-com/add-note/AddNote";
import ReduxCom from "./component/other-com/redux-file/ReduxCom";
import TextField from "./component/TextField";
import PageNotFound from "./pages/page-notfound";
import DynamicPage from "./component/other-com/dynamicRoute/DynamicPage";
import ClientPage from "./component/other-com/dynamicRoute/ClientPage";
import SearchPage from "./component/other-com/search/SearchPage";
import MobileNumber from "./component/other-com/otp-login/MobileNumber";
import NavBar from "./component/NavBar";
import MoviePage from "./component/other-com/movie-ticket/MoviePage";
import BreadcrumbPage from "./component/other-com/breadcrumb/BreadcrumbPage";
import BreadCurmPageTwo from "./component/other-com/breadcrumb/BreadCurmPageTwo";
import BreadCrum from "./component/other-com/breadcrumb/BreadCrum";

const MultipleApiCall = lazy(
	() => import("./component/multiple-api/MultipleApiCall"),
);
const AtmPage = lazy(() => import("./pages/atm-page"));
const WeatherApp = lazy(
	() => import("./component/other-com/weather-page/WeatherApp"),
);

function App() {
	return (
		<>
			<NavBar />
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5">
				<BreadCrum />
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/text-field" element={<TextField />} />
						<Route path="/use-state" element={<UseStateHook />} />
						<Route path="/custom-hooks" element={<CustomHooks />} />
						<Route path="/add-note" element={<AddNote />} />
						<Route path="/redux-page" element={<ReduxCom />} />
						<Route path="/dynamic-page" element={<DynamicPage />} />
						<Route path="/dynamic-page/:id" element={<ClientPage />} />
						<Route path="/search-page" element={<SearchPage />} />
						<Route path="/mobile-otp" element={<MobileNumber />} />
						<Route path="/movie-booking" element={<MoviePage />} />
						<Route path="/breadcrumb" element={<BreadcrumbPage />} />
						<Route path="/breadcrumb/:id" element={<BreadCurmPageTwo />} />
						<Route path="/weather-page" element={<WeatherApp />} />
						<Route path="/atm-page" element={<AtmPage />} />
						<Route path="/multiple-api" element={<MultipleApiCall />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</Suspense>
			</div>
		</>
	);
}

export default App;
