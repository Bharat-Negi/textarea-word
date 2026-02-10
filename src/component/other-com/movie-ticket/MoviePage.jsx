import React from "react";
import CinemaSeatBooking from "./CinemaSeatBooking";

const MoviePage = () => {
	return (
		<CinemaSeatBooking
			layout={{
				rows: 8,
				seatsPerRow: 12,
				aislePosition: 7,
			}}
			seatTypes={{
				basic: { name: "Basic", price: 100, rows: [0, 1] },
				regular: { name: "Regular", price: 200, rows: [2, 3, 4] },
				premium: { name: "Premium", price: 300, rows: [5, 6] },
				vip: { name: "VIP", price: 400, rows: [7] },
			}}
			bookedSeats={[]}
			onBookingComplete={(booking) => {
				console.log(booking);
			}}
		/>
	);
};

export default MoviePage;
