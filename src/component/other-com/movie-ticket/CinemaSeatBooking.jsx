import React, { useEffect, useMemo, useState, useCallback } from "react";

// 🔴 Simulate backend API call for seats booked by other users
const fetchBookedSeatsFromServer = async () => {
	// Simulate network delay
	await new Promise((res) => setTimeout(res, 500));
	// Seats booked by OTHER users (mock data)
	return [];
};

// 🎬 Main Cinema Seat Booking Component
const CinemaSeatBooking = ({
	layout = {},
	seatTypes = {},
	bookedSeats = [],
	currency = "₹",
	onBookingComplete = () => {},
	title = "Cinema Hall Booking",
	subtitle = "Select your preferred seats",
	storageKey = "cinemaBookingData", // Local storage key
}) => {
	// 🎨 Color palette memoized to avoid re-creation
	const colors = useMemo(
		() => [
			"blue",
			"purple",
			"yellow",
			"green",
			"red",
			"indigo",
			"pink",
			"gray",
		],
		[],
	);

	// 🎟️ Determine seat type based on row number
	const getSeatType = useCallback(
		(row) => {
			const entries = Object.entries(seatTypes || {});
			// Default seat type if none provided
			if (entries.length === 0) {
				return { type: "regular", price: 150, color: "blue", name: "Regular" };
			}

			// Match seat type by row
			for (let i = 0; i < entries.length; i++) {
				const [type, config] = entries[i];

				if (Array.isArray(config?.rows) && config.rows.includes(row)) {
					return {
						type,
						color: colors[i % colors.length],
						...config,
					};
				}
			}

			// Fallback to first seat type
			const [firstType, firstConfig] = entries[0];
			return {
				type: firstType,
				color: colors[0],
				...firstConfig,
			};
		},
		[seatTypes, colors],
	);

	// 🪑 Initialize seat layout (memoized)
	const initializeSeats = useMemo(() => {
		if (!layout?.rows || !layout?.seatsPerRow) return [];

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
					price: seatTypeInfo.price ?? 150,
					color: seatTypeInfo.color ?? "blue",
					status: bookedSeats.includes(seatId) ? "booked" : "available",
					selected: false,
				});
			}
			seats.push(seatRow);
		}

		return seats;
	}, [layout, bookedSeats, getSeatType]);

	// 🧠 Load initial state from local storage
	const loadFromLocalStorage = () => {
		try {
			const savedData = localStorage.getItem(storageKey);
			if (savedData) {
				const parsedData = JSON.parse(savedData);

				// Check if saved data matches current layout
				if (
					parsedData.layout &&
					parsedData.layout.rows === layout.rows &&
					parsedData.layout.seatsPerRow === layout.seatsPerRow
				) {
					// Transform saved seats array back to 2D structure
					const savedSeats = initializeSeats.map((row, rowIndex) =>
						row.map((seat, seatIndex) => {
							const savedSeat = parsedData.seats
								.flat()
								.find((s) => s.id === seat.id);
							if (savedSeat) {
								return { ...seat, status: savedSeat.status };
							}
							return seat;
						}),
					);

					return {
						seats: savedSeats,
						selectedSeats: [],
						savedBookings: parsedData.bookings || [],
					};
				}
			}
		} catch (error) {
			console.error("Error loading from localStorage:", error);
		}

		return {
			seats: initializeSeats,
			selectedSeats: [],
			savedBookings: [],
		};
	};

	// 🧠 Component State
	const [seats, setSeats] = useState(initializeSeats);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [savedBookings, setSavedBookings] = useState([]);

	// 🎨 Get Tailwind classes based on seat color
	const getColorClass = (colorName) => {
		const colorMap = {
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
		return colorMap[colorName] || colorMap.blue;
	};

	// 💾 Save to local storage
	const saveToLocalStorage = (updatedSeats, newBooking = null) => {
		try {
			const dataToSave = {
				layout: {
					rows: layout.rows,
					seatsPerRow: layout.seatsPerRow,
					aislePosition: layout.aislePosition,
				},
				seatTypes,
				seats: updatedSeats,
				bookings: newBooking ? [...savedBookings, newBooking] : savedBookings,
				lastUpdated: new Date().toISOString(),
			};

			localStorage.setItem(storageKey, JSON.stringify(dataToSave));

			if (newBooking) {
				setSavedBookings((prev) => [...prev, newBooking]);
			}
		} catch (error) {
			console.error("Error saving to localStorage:", error);
		}
	};

	// 🖱️ Handle seat selection
	const handleSeatClick = (rowIndex, seatIndex) => {
		const seat = seats[rowIndex][seatIndex];

		// Prevent interaction with booked seats
		if (seat.status === "booked" || seat.price === 0) return;
		const isCurrentlySelected = seat.selected;

		// Toggle seat selected state
		const updatedSeats = seats.map((row, rIdx) =>
			row.map((s, sIdx) =>
				rIdx === rowIndex && sIdx === seatIndex
					? { ...s, selected: !s.selected }
					: s,
			),
		);

		setSeats(updatedSeats);

		// Update selected seats list
		if (isCurrentlySelected) {
			setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
		} else {
			setSelectedSeats((prev) => [...prev, seat]);
		}
	};

	// 🪑 Render seat sections (left/right of aisle)
	const renderSeatSection = (seatRow, startIndex, endIndex) => {
		return (
			<div className="flex">
				{seatRow.slice(startIndex, endIndex).map((seat, index) => {
					return (
						<div
							className={getSeatClassName(seat)}
							key={seat.id}
							title={`${seat.id} - ${getSeatType(seat.row)?.name || "Regular"} - ${currency}${seat.price}`}
							onClick={() => handleSeatClick(seat.row, startIndex + index)}
						>
							{startIndex + index + 1}
						</div>
					);
				})}
			</div>
		);
	};

	// 🪑 Seat UI class generator
	const getSeatClassName = (seat) => {
		const baseClass =
			"w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 m-1 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold border-blue-300 text-blue-800 bg-blue-100";

		// Booked / unavailable seat
		if (seat.status === "booked" || seat.price === 0) {
			return `${baseClass} bg-gray-400 border-gray-500 text-gray-600 !cursor-not-allowed`;
		}
		// Selected seat
		if (seat.selected) {
			return `${baseClass} bg-green-400 border-green-500 text-white transform scale-110`;
		}

		// Available seat
		return `${baseClass} ${getColorClass(seat.color)}`;
	};

	// 🎫 Unique seat types for legend
	const uniqueSeatTypes = Object.entries(seatTypes).map(
		([type, config], index) => {
			return {
				type,
				color: colors[index % colors.length],
				...config,
			};
		},
	);

	// 💰 Calculate total price
	const getTotalPrice = () => {
		return selectedSeats.reduce((total, seat) => total + (seat.price || 0), 0);
	};

	// ✅ Final booking handler
	const handleBooking = () => {
		if (selectedSeats.length === 0) {
			alert("Please select at least one seat");
			return;
		}

		// Mark selected seats as booked
		const updatedSeats = seats.map((row) =>
			row.map((seat) => {
				if (selectedSeats.some((selected) => selected.id === seat.id)) {
					return { ...seat, status: "booked", selected: false };
				}
				return seat;
			}),
		);

		setSeats(updatedSeats);

		// Create booking record
		const bookingRecord = {
			id: Date.now(),
			date: new Date().toISOString(),
			seats: selectedSeats.map((seat) => seat.id),
			totalPrice: getTotalPrice(),
			seatDetails: selectedSeats,
		};

		// Save to local storage
		saveToLocalStorage(updatedSeats, bookingRecord);

		// Callback to parent
		onBookingComplete({
			seats: selectedSeats,
			totalPrice: getTotalPrice(),
			seatIds: selectedSeats.map((seat) => seat.id),
		});

		// alert
		alert(
			`Successfully booked ${selectedSeats.length} seat(s) for ${currency}${getTotalPrice()}`,
		);

		// Reset selection
		setSelectedSeats([]);
	};

	// 🎬 Reset seats for a new show
	const startNewShow = () => {
		const confirmed = window.confirm(
			"Are you sure you want to start a new show? This will clear all bookings.",
		);

		if (confirmed) {
			// Clear local storage for this key
			localStorage.removeItem(storageKey);

			setSeats(initializeSeats);
			setSelectedSeats([]);
			setSavedBookings([]);

			alert("🎬 New show started - All bookings cleared!");
		}
	};

	// 📋 Clear all local storage
	const clearAllStorage = () => {
		const confirmed = window.confirm(
			"Are you sure you want to clear ALL stored booking data? This cannot be undone.",
		);

		if (confirmed) {
			localStorage.clear();
			setSeats(initializeSeats);
			setSelectedSeats([]);
			setSavedBookings([]);
			alert("All booking data cleared!");
		}
	};

	// 📋 View booking history
	const viewBookingHistory = () => {
		if (savedBookings.length === 0) {
			alert("No booking history found.");
			return;
		}

		const history = savedBookings
			.map(
				(booking) =>
					`Booking #${booking.id}: ${booking.seats.length} seat(s) - ${currency}${booking.totalPrice} (${new Date(booking.date).toLocaleDateString()})`,
			)
			.join("\n");

		alert(`Booking History:\n\n${history}`);
	};

	// 🔄 Poll server for seats booked by other users
	useEffect(() => {
		const interval = setInterval(async () => {
			const serverBookedSeats = await fetchBookedSeatsFromServer();

			setSeats((prevSeats) =>
				prevSeats.map((row) =>
					row.map((seat) => {
						if (serverBookedSeats.includes(seat.id)) {
							return {
								...seat,
								status: "booked",
								price: 0,
								selected: false,
							};
						}
						return seat;
					}),
				),
			);
		}, 4000); // poll every 4 sec

		return () => clearInterval(interval);
	}, []);

	// 💾 Load from local storage on mount
	useEffect(() => {
		const loadedData = loadFromLocalStorage();

		// Use a cleanup function to defer state updates
		const timeoutId = setTimeout(() => {
			setSeats(loadedData.seats);
			setSavedBookings(loadedData.savedBookings);
		}, 0);

		return () => clearTimeout(timeoutId);
	}, []);

	// 💾 Auto-save seats when they change
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			saveToLocalStorage(seats);
		}, 500); // Debounce save

		return () => clearTimeout(timeoutId);
	}, [seats]);

	/* ========================= JSX ============================== */
	return (
		<div className="w-full min-h-screen bg-gray-50 p-4">
			{/* Title */}
			<div className="max-w-6xl max-auto bg-white rounded-lg shadow-lg p-6">
				<h1 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800">
					{title}
				</h1>
				<p className="text-center text-gray-600 mb-2">{subtitle}</p>

				{/* Local Storage Info */}
				<div className="text-center mb-4">
					<div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
								clipRule="evenodd"
							/>
						</svg>
						<span>Data saved locally ({savedBookings.length} bookings)</span>
					</div>
				</div>

				{/* Screen */}
				<div className="mb-8">
					<div className="w-full h-4 bg-linear-to-r from-gray-300 rounded-full via-gray-400 to-gray-300 mb-2 shadow-inner" />
					<p className="text-center text-sm text-gray-500 font-medium">
						SCREEN
					</p>
				</div>

				{/* Seat map */}
				<div className="mb-6 overflow-x-auto">
					<div className="flex flex-col items-center min-w-max">
						{seats.map((row, rowIndex) => {
							return (
								<div key={rowIndex} className="flex items-center mb-2">
									<span className="font-bold w-8 text-center text-gray-600 mr-4">
										{String.fromCharCode(65 + rowIndex)}
									</span>
									{renderSeatSection(row, 0, layout.aislePosition)}
									{/* aisle */}
									<div className="w-8"></div>
									{renderSeatSection(
										row,
										layout.aislePosition,
										layout.seatsPerRow,
									)}
								</div>
							);
						})}
					</div>
				</div>

				{/* Legend */}
				<div className="flex flex-wrap justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
					{uniqueSeatTypes.map((seatTypes) => {
						return (
							<div key={seatTypes.type} className="flex items-center">
								<div
									className={`w-6 h-6 border-2 rounded-t-lg mr-2 ${getColorClass(seatTypes.color) || "bg-blue-100 border-blue-300"}`}
								></div>
								<span className="text-sm">
									{seatTypes.name} ({currency} {seatTypes.price})
								</span>
							</div>
						);
					})}

					<div className="flex items-center">
						<div className="w-6 h-6 bg-green-500 border-2 border-green-600 rounded-t-lg mr-2"></div>
						<span className="text-sm">Selected</span>
					</div>
					<div className="flex items-center">
						<div className="w-6 h-6 bg-gray-400 border-2 border-gray-500 rounded-t-lg mr-2"></div>
						<span className="text-sm">Booked</span>
					</div>
				</div>

				{/* Summary */}
				<div className="bg-gray-100 rounded-lg p-4 mb-4">
					<h3 className="font-bold text-lg mb-2">Booking Summary</h3>
					{selectedSeats.length > 0 ? (
						<div>
							<p className="mb-2">
								Selected Seats: &nbsp;
								<span className="font-medium">
									{selectedSeats.map((s) => s.id).join(", ")}
								</span>
							</p>
							<p className="mb-2">
								Number of Seats: &nbsp;
								<span className="font-medium">{selectedSeats.length}</span>
							</p>
							<p className="text-xl font-bold text-green-600">
								Total: {currency}
								{getTotalPrice()}
							</p>
						</div>
					) : (
						<p className="text-gray-500">No Seats Selected</p>
					)}
				</div>

				{/* Book Button */}
				<button
					onClick={handleBooking}
					disabled={selectedSeats.length === 0}
					className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${selectedSeats.length > 0 ? "bg-green-500 hover:bg-green-600 text-white transform hover:scale-101 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
				>
					{selectedSeats.length > 0
						? `Book ${selectedSeats.length} Seat(s) - ${currency}${getTotalPrice()}`
						: "Select Seats to Book"}
				</button>

				{/* Utility Buttons */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
					<button
						onClick={startNewShow}
						className="py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer"
					>
						Start New Show
					</button>
					<button
						onClick={viewBookingHistory}
						className="py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-bold cursor-pointer"
					>
						View History ({savedBookings.length})
					</button>
					<button
						onClick={clearAllStorage}
						className="py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold cursor-pointer"
					>
						Clear All Data
					</button>
				</div>
			</div>
		</div>
	);
};

export default CinemaSeatBooking;
