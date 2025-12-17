import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import TextField from "./component/TextField";
import UseStateHook from "./component/Hooks/UseStateHook";
import UseEffectHook from "./component/Hooks/UseEffectHook";
import UseContextHook from "./component/Hooks/UseContextHook";
import UseRefHook from "./component/Hooks/UseRefHook";
import UseReducerHook from "./component/Hooks/UseReducerHook";
import UseMemoHook from "./component/Hooks/UseMemoHook";
import UseCallbackHook from "./component/Hooks/UseCallbackHook";
import UseLayoutEffectHook from "./component/Hooks/UseLayoutEffectHook";
import CustomHooks from "./component/Hooks/CustomHooks";

function App() {
	return (
		<>
			<div className="container mt-5">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/text-field" element={<TextField />} />
					<Route path="/use-state" element={<UseStateHook />} />
					<Route path="/use-effect" element={<UseEffectHook />} />
					<Route path="/use-context" element={<UseContextHook />} />
					<Route path="/use-ref" element={<UseRefHook />} />
					<Route path="/use-reducer" element={<UseReducerHook />} />
					<Route path="/use-layouteffect" element={<UseLayoutEffectHook />} />
					<Route path="/use-memo" element={<UseMemoHook />} />
					<Route path="/use-callback" element={<UseCallbackHook />} />
					<Route path="/custom-hooks" element={<CustomHooks />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
