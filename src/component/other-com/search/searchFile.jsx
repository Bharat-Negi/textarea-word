import React from "react";

const SearchFile = ({ search, setSearch }) => {
	return (
		<div className="mb-2">
			<input
				type="text"
				value={search}
				className="border px-3 py-1 border-gray-700 min-w-5/6"
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	);
};

export default SearchFile;
