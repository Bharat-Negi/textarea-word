import React, { useMemo, useState } from "react";

const CinemaSeatBooking = ({
	layout = {
		rows: 8,
		seatsPerRow: 12,
		aislePosition: 5,
	},
	seatTypes = {
		regular: { name: "Regular", price: 150, rows: [0, 1, 2] },
		premium: { name: "Premium", price: 250, rows: [3, 4, 5] },
		vip: { name: "VIP", price: 350, rows: [6, 7] },
	},
	bookedSeats = [],
	currency = "₹",
	onBookingComplete = () => {},
	title = "Cinema Hall Booking",
	subtitle = "Select your preferred seats",
}) => {
	const colors = [
		"blue",
		"purple",
		"yellow",
		"green",
		"red",
		"indigo",
		"pink",
		"gray",
	];

	const getSeatType = (row) => {
		const entries = Object.entries(seatTypes);
		for (let i = 0; i < entries.length; i++) {
			const [type, config] = entries[i];
			if (config.rows.includes(row)) {
				return { type, color: colors[i % colors.length], ...config };
			}
		}
		const [type, config] = entries[0];
		return { type, color: colors[0], ...config };
	};

	const initializeSeats = useMemo(() => {
		const seats = [];
		for (let row = 0; row < layout.rows; row++) {
			const seatRow = [];
			const seatTypeInfo = getSeatType(row);
			for (let seat = 0; seat < layout.seatsPerRow; seat++) {
				const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
				seatRow.push({
					id: seatId,
					row,
					seat,
					type: seatTypeInfo.type,
					price: seatTypeInfo.price,
					color: seatTypeInfo.color,
					status: bookedSeats.includes(seatId) ? "booked" : "available",
					selected: false,
				});
			}
			seats.push(seatRow);
		}
		return seats;
	}, [layout, seatTypes, bookedSeats]);

	const [seats, setSeats] = useState(initializeSeats);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [isBooking, setIsBooking] = useState(false);

	// 🔥 FETCHER STYLE TOTAL (AUTO RESET TO 0)
	const totalPrice = useMemo(() => {
		return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
	}, [selectedSeats]);

	const getColorClass = (color) => {
		const map = {
			blue: "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
			purple:
				"bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200",
			yellow:
				"bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200",
			green: "bg-green-100 border-green-300 text-green-800 hover:bg-green-200",
			red: "bg-red-100 border-red-300 text-red-800 hover:bg-red-200",
			indigo:
				"bg-indigo-100 border-indigo-300 text-indigo-800 hover:bg-indigo-200",
			pink: "bg-pink-100 border-pink-300 text-pink-800 hover:bg-pink-200",
			gray: "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200",
		};
		return map[color] || map.blue;
	};

	const getSeatClassName = (seat) => {
		const base =
			"w-10 h-10 m-1 rounded-t-lg border-2 cursor-pointer flex items-center justify-center text-sm font-bold transition";

		if (seat.status === "booked")
			return `${base} bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed`;

		if (seat.selected)
			return `${base} bg-green-500 border-green-600 text-white scale-110`;

		return `${base} ${getColorClass(seat.color)}`;
	};

	const handleSeatClick = (rowIndex, seatIndex) => {
		const seat = seats[rowIndex][seatIndex];
		if (seat.status === "booked") return;

		setSeats((prev) =>
			prev.map((row, r) =>
				row.map((s, c) =>
					r === rowIndex && c === seatIndex
						? { ...s, selected: !s.selected }
						: s,
				),
			),
		);

		setSelectedSeats((prev) =>
			seat.selected ? prev.filter((s) => s.id !== seat.id) : [...prev, seat],
		);
	};

	const renderSeatSection = (row, start, end) => (
		<div className="flex">
			{row.slice(start, end).map((seat, i) => (
				<div
					key={seat.id}
					className={getSeatClassName(seat)}
					onClick={() => handleSeatClick(seat.row, start + i)}
				>
					{start + i + 1}
				</div>
			))}
		</div>
	);

	// 🔥 FETCHER BOOKING
	const handleBooking = async () => {
		if (!selectedSeats.length) return alert("Select seats first");

		setIsBooking(true);

		// simulate API call
		await new Promise((res) => setTimeout(res, 800));

		setSeats((prev) =>
			prev.map((row) =>
				row.map((seat) =>
					selectedSeats.some((s) => s.id === seat.id)
						? { ...seat, status: "booked", selected: false }
						: seat,
				),
			),
		);

		onBookingComplete({
			seats: selectedSeats,
			totalPrice,
			seatIds: selectedSeats.map((s) => s.id),
		});

		alert(
			`Booked ${selectedSeats.length} seat(s) for ${currency}${totalPrice}`,
		);

		// 🔥 RESET STATE
		setSelectedSeats([]);
		setIsBooking(false);
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
				<h1 className="text-3xl font-bold text-center">{title}</h1>
				<p className="text-center text-gray-500 mb-6">{subtitle}</p>

				<div className="text-center mb-6">
					<div className="h-3 bg-gray-400 rounded-full mb-2"></div>
					<span className="text-sm text-gray-600">SCREEN</span>
				</div>

				<div className="flex flex-col items-center mb-6">
					{seats.map((row, r) => (
						<div key={r} className="flex items-center">
							<span className="w-8 font-bold mr-3">
								{String.fromCharCode(65 + r)}
							</span>
							{renderSeatSection(row, 0, layout.aislePosition)}
							<div className="w-8" />
							{renderSeatSection(row, layout.aislePosition, layout.seatsPerRow)}
						</div>
					))}
				</div>

				<div className="bg-gray-100 p-4 rounded mb-4">
					<h3 className="font-bold mb-2">Booking Summary</h3>
					{selectedSeats.length ? (
						<>
							<p>Seats: {selectedSeats.map((s) => s.id).join(", ")}</p>
							<p>Total Seats: {selectedSeats.length}</p>
							<p className="text-xl font-bold text-green-600">
								Total: {currency}
								{totalPrice}
							</p>
						</>
					) : (
						<p className="text-gray-500">No seats selected</p>
					)}
				</div>

				<button
					onClick={handleBooking}
					disabled={!selectedSeats.length || isBooking}
					className={`w-full py-3 rounded-lg font-bold text-lg ${
						selectedSeats.length && !isBooking
							? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
							: "bg-gray-300 text-gray-500"
					}`}
				>
					{isBooking
						? "Booking..."
						: selectedSeats.length
							? `Book ${selectedSeats.length} Seat(s) - ${currency}${totalPrice}`
							: "Select Seats to Book"}
				</button>
			</div>
		</div>
	);
};

export default CinemaSeatBooking;
