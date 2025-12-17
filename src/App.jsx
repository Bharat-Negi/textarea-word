import React from "react";
import { useState } from "react";

function App() {
	const [inputword, setInputWord] = useState("");

	const handleChange = (e) => {
		setInputWord(e.target.value);
	};

	let wordcount = inputword.trim().split(" ").filter(Boolean).length;
	let wordText = inputword.trim().length;

	return (
		<>
			<div className="container mt-5">
				<h1 className="text-center">Find Word</h1>
				<textarea
					className="w-100"
					name="word_counter"
					id=""
					onChange={handleChange}
					rows="4"
					cols="50"
					placeholder="Enter your message here..."
				></textarea>
				<h3>Word: {wordcount}</h3>
				<h3>Text: {wordText}</h3>
			</div>
		</>
	);
}

export default App;
