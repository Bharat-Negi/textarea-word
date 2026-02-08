import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";

const BreadcrumbPage = () => {
	const [proData, setProData] = useState([]);

	useEffect(() => {
		fetch("https://dummyjson.com/products")
			.then((res) => res.json())
			.then((res) => {
				const sliceTrending = res.products.slice(0, 6);
				setProData(sliceTrending);
			});
	}, []);

	return (
		<div>
			<h2 className="text-2xl text-center mb-4 font-semibold">Product Page</h2>
			<div className="grid grid-cols-3">
				{proData.map((products) => {
					return (
						<ProductList
							key={products.id}
							id={products.id}
							price={products.price}
							title={products.title}
							brand={products.brand}
							thumbnail={products.thumbnail}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default BreadcrumbPage;
