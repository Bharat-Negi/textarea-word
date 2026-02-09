import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../../../redux/features/themeSlice";

const ThemeWrapper = ({ children }) => {
	const dispatch = useDispatch();
	const { mode } = useSelector((state) => state.theme);

	return (
		<div
			className={`flex items-center justify-center relative
			${mode === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
		>
			<div className="absolute top-2 right-2">
				<button onClick={() => dispatch(toggleTheme())}>
					{mode === "dark" ? <FaSun /> : <FaMoon />}
				</button>
			</div>

			{children}
		</div>
	);
};

export default React.memo(ThemeWrapper);
