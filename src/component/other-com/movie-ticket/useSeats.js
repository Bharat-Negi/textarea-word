// useSeats.js
import { useMemo, useState, useCallback } from "react";
import { colors } from "./seatUtils";

export const useSeats = ({ layout, seatTypes, bookedSeats }) => {
	const getSeatType = useCallback(
		(row) => {
			const entries = Object.entries(seatTypes || {});
			if (!entries.length)
				return { type: "regular", price: 150, color: "blue", name: "Regular" };

			for (let i = 0; i < entries.length; i++) {
				const [type, config] = entries[i];
				if (config?.rows?.includes(row)) {
					return { type, color: colors[i % colors.length], ...config };
				}
			}
			const [type, config] = entries[0];
			return { type, color: colors[0], ...config };
		},
		[seatTypes],
	);

	const initialSeats = useMemo(() => {
		if (!layout?.rows || !layout?.seatsPerRow) return [];
		return Array.from({ length: layout.rows }, (_, row) =>
			Array.from({ length: layout.seatsPerRow }, (_, seat) => {
				const id = `${String.fromCharCode(65 + row)}${seat + 1}`;
				const info = getSeatType(row);
				return {
					id,
					row,
					seat,
					type: info.type,
					price: info.price,
					color: info.color,
					status: bookedSeats.includes(id) ? "booked" : "available",
					selected: false,
				};
			}),
		);
	}, [layout, bookedSeats, getSeatType]);

	const [seats, setSeats] = useState(initialSeats);
	const [selectedSeats, setSelectedSeats] = useState([]);

	return {
		seats,
		setSeats,
		selectedSeats,
		setSelectedSeats,
		getSeatType,
		initialSeats,
	};
};
