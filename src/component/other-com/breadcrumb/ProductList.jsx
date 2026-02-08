import React from "react";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";

const ProductList = ({ id, price, title, brand, thumbnail }) => {
	const truncateWords = (text, wordLimit = 5) => {
		if (!text) return "";
		const words = text.split(" ");
		return words.length > wordLimit
			? words.slice(0, wordLimit).join(" ") + "..."
			: text;
	};

	const truncate = (text, maxLength = 20) => {
		if (!text) return "";
		return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
	};

	return (
		<div className="w-full pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2">
			<div className="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
				<figure className="mb-2">
					<img src={thumbnail} alt="" className="h-64 ml-auto mr-auto" />
				</figure>
				<div className="rounded-lg p-4 bg-purple-700 flex flex-col">
					<div>
						<h5
							className="text-white text-2xl font-bold leading-none"
							title={title}
						>
							{truncate(title)}
						</h5>
						<span className="text-xs text-gray-400 leading-none">{brand}</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-lg text-white font-light">${price}</div>
						<Link to={`/breadcrumb/${id}`}>
							<button className="rounded-full bg-purple-900 text-white hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-10 h-10 flex ml-auto transition duration-300 cursor-pointer items-center justify-center">
								<TiPlus size={30} />
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
