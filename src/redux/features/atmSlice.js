import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import users data from JSON file
import usersData from "../../../public/json/atm-users.json"; // Create this file in your project

/* Load saved data */
const loadStoredATM = () => {
	try {
		const storedData = localStorage.getItem("atmData");
		if (!storedData) return null;

		const parsedData = JSON.parse(storedData);

		// Reset currentUser to null for security when loading from storage
		return {
			...parsedData,
			currentUser: null,
			message: "",
		};
	} catch (error) {
		console.error("Error loading ATM data:", error);
		toast.error("Error loading saved data");
		return null;
	}
};

/* Save data pin change */
const saveState = (state) => {
	try {
		// Create a clean copy without currentUser for security
		const stateToSave = {
			...state,
			currentUser: null,
			message: "",
		};
		localStorage.setItem("atmData", JSON.stringify(stateToSave));
	} catch (error) {
		console.error("Error saving ATM data:", error);
		toast.error("Error saving data");
	}
};

/* Show toast notification */
const showToast = (type, message, options = {}) => {
	const defaultOptions = {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		theme: "colored",
		...options,
	};

	switch (type) {
		case "success":
			toast.success(message, defaultOptions);
			break;
		case "error":
			toast.error(message, defaultOptions);
			break;
		case "warning":
			toast.warning(message, defaultOptions);
			break;
		case "info":
			toast.info(message, defaultOptions);
			break;
		default:
			toast(message, defaultOptions);
	}
};

/* update user data */
const updateUserInUsers = (state, updatedUser) => {
	const index = state.users.findIndex((u) => u.id === updatedUser.id);

	if (index !== -1) {
		state.users[index] = updatedUser;
		state.currentUser = updatedUser;
	}
};

const storedATM = loadStoredATM();

const initialState = storedATM || {
	users: usersData,
	currentUser: null,
	message: "",
};

const atmSlice = createSlice({
	name: "atm",
	initialState,
	reducers: {
		login: (state, action) => {
			const user = state.users.find((u) => u.pin === action.payload);
			if (user) {
				state.currentUser = { ...user };
				state.message = "Login successful";
				showToast("success", "Login successful");
			} else {
				state.message = "Invalid PIN";
				showToast("error", "Invalid PIN");
			}
			saveState(state);
		},

		deposit: (state, action) => {
			if (!state.currentUser) {
				state.message = "No active session";
				showToast("error", "No active session", {
					position: "top-center",
				});
				return;
			}

			const amount = Number(action.payload);
			if (isNaN(amount) || amount <= 0) {
				state.message = "Invalid deposit amount";
				showToast("error", "Invalid deposit amount");
				return;
			}

			state.currentUser.balance += amount;
			state.currentUser.history.push({
				type: "Deposit",
				amount: amount,
				date: new Date().toISOString(),
			});

			updateUserInUsers(state, state.currentUser);
			state.message = `Deposited ₹${amount} successfully`;
			showToast("success", `Deposited ₹${amount} successfully`, {
				autoClose: 2000,
			});
			saveState(state);
		},

		withdraw: (state, action) => {
			if (!state.currentUser) {
				state.message = "No active session";
				showToast("error", "No active session", {
					position: "top-center",
				});
				return;
			}

			const amount = Number(action.payload);
			if (isNaN(amount) || amount <= 0) {
				state.message = "Invalid withdrawal amount";
				showToast("error", "Invalid withdrawal amount");
				return;
			}

			if (amount > state.currentUser.balance) {
				state.message = "Insufficient balance";
				showToast("error", "Insufficient balance", {
					autoClose: 4000,
				});
				return;
			}

			state.currentUser.balance -= amount;
			state.currentUser.history.push({
				type: "Withdraw",
				amount: amount,
				date: new Date().toISOString(),
			});

			updateUserInUsers(state, state.currentUser);
			state.message = `Withdrawn ₹${amount} successfully`;
			showToast("error", `Withdrawn ₹${amount} successfully`, {
				autoClose: 2000,
			});
			saveState(state);
		},

		changePin: (state, action) => {
			if (!state.currentUser) {
				state.message = "No active session";
				showToast("error", "No active session", {
					position: "top-center",
				});
				return;
			}

			const { oldPin, newPin } = action.payload;

			// Validation checks
			if (state.currentUser.pin !== oldPin) {
				state.message = "Old PIN is incorrect";
				showToast("error", "Old PIN is incorrect");
				return;
			}

			if (oldPin === newPin) {
				state.message = "New PIN cannot be same as old PIN";
				showToast("warning", "New PIN cannot be same as old PIN");
				return;
			}

			if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
				state.message = "PIN must be 4 digits";
				showToast("warning", "PIN must be 4 digits");
				return;
			}

			const pinExists = state.users.some((u) => u.pin === newPin);
			if (pinExists) {
				state.message = "PIN already in use";
				showToast("error", "PIN already in use");
				return;
			}

			const updatedUser = {
				...state.currentUser,
				pin: newPin,
			};

			updateUserInUsers(state, updatedUser);
			state.message = "PIN changed successfully";
			showToast("success", "PIN changed successfully", {
				autoClose: 2500,
			});
			saveState(state);
		},

		logout: (state) => {
			state.currentUser = null;
			state.message = "Session ended";
			showToast("info", "Session ended", {
				position: "bottom-center",
				autoClose: 2000,
			});
			saveState(state);
		},

		// Manual toast triggers for testing
		showSuccessToast: () => {
			showToast("success", "This is a success message");
		},

		showErrorToast: () => {
			showToast("error", "This is an error message");
		},

		showWarningToast: () => {
			showToast("warning", "This is a warning message");
		},

		showInfoToast: () => {
			showToast("info", "This is an info message");
		},

		// Toast with different positions
		showTopLeftToast: () => {
			showToast("success", "Top-left notification", {
				position: "top-left",
			});
		},

		showBottomRightToast: () => {
			showToast("info", "Bottom-right notification", {
				position: "bottom-right",
			});
		},

		// Long duration toast
		showPersistentToast: () => {
			showToast("warning", "This toast will stay longer", {
				autoClose: 10000, // 10 seconds
			});
		},

		// Toast with custom styling
		showCustomToast: () => {
			toast("Custom styled toast!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				style: {
					background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
					color: "white",
					fontWeight: "bold",
				},
			});
		},
	},
});

export const {
	login,
	deposit,
	withdraw,
	logout,
	changePin,
	showSuccessToast,
	showErrorToast,
	showWarningToast,
	showInfoToast,
	showTopLeftToast,
	showBottomRightToast,
	showPersistentToast,
	showCustomToast,
} = atmSlice.actions;
export default atmSlice.reducer;
