import React, { useState } from "react";
import LoopData from "./LoopData";
import SearchFile from "./searchFile";

const SearchPage = () => {
	const [search, setSearch] = useState("");

	return (
		<div>
			<h1>Search by Name</h1>

			<div className="w-full">
				<SearchFile search={search} setSearch={setSearch} />
				<LoopData search={search} />
			</div>
		</div>
	);
};

export default SearchPage;
