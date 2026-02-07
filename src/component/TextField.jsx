import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const TextField = () => {
	const [inputword, setInputWord] = useState("");

	const handleChange = (e) => {
		setInputWord(e.target.value);
	};

	let wordcount = inputword.trim().split(" ").filter(Boolean).length;
	let wordText = inputword.trim().length;
	let cloneWord = inputword;

	return (
		<>
			<h1 className="text-center text-2xl mb-3">Find Word</h1>
			<textarea
				className="w-full border p-3"
				name="word_counter"
				id=""
				onChange={handleChange}
				rows="4"
				cols="50"
				placeholder="Enter your message here..."
			></textarea>
			<h3>Word: {wordcount}</h3>
			<h3>Text: {wordText}</h3>
			<p>Clone Text: {cloneWord}</p>
		</>
	);
};

export default TextField;
