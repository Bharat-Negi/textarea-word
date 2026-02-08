import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BreadCurmPageTwo = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		fetch(`https://dummyjson.com/products/${id}`)
			.then((res) => res.json())
			.then((res) => {
				setProduct(res);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false); // ✅ correct place
			});
	}, [id]);

	return (
		<>
			<h1 className="text-2xl">Product Details</h1>

			{loading && <p>Loading...</p>}

			{!loading && product && (
				<div>
					<p>
						<strong>Title:</strong> {product.title}
					</p>
					<p>
						<strong>Price:</strong> ₹{product.price}
					</p>
				</div>
			)}
		</>
	);
};

export default BreadCurmPageTwo;
