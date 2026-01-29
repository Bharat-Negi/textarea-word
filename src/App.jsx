import { Route, Routes } from "react-router-dom";
import CustomHooks from "./component/Hooks/CustomHooks";
import UseStateHook from "./component/Hooks/UseStateHook";
import AddNote from "./component/other-com/add-note/AddNote";
import TextField from "./component/TextField";
import Home from "./pages/home";
import PageNotFound from "./pages/page-notfound";

function App() {
	return (
		<>
			<div className="container mt-5">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/text-field" element={<TextField />} />
					<Route path="/use-state" element={<UseStateHook />} />
					<Route path="/custom-hooks" element={<CustomHooks />} />
					<Route path="/add-note" element={<AddNote />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
