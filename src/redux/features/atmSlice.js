import { createSlice } from "@reduxjs/toolkit";

/* Save data pin change */
const saveState = (state) => {
	localStorage.setItem("atmData", JSON.stringify(state));
};

/* Load saved data */
const storedATM = JSON.parse(localStorage.getItem("atmData"));

/* update user data */
const updateUserInUsers = (state, updatedUser) => {
	const index = state.users.findIndex((u) => u.id === updatedUser.id);

	if (index !== -1) {
		state.users[index] = updatedUser; // ✅ update users array
		state.currentUser = updatedUser; // ✅ sync currentUser
	}
};

const initialState = storedATM || {
	users: [
		{
			id: 1,
			name: "Bharat",
			pin: "1111",
			balance: 10000,
			history: [],
		},
		{
			id: 2,
			name: "Amit",
			pin: "2222",
			balance: 8000,
			history: [],
		},
	],
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
				state.currentUser = user;
				state.message = "Login successful ✅";
			} else {
				state.message = "Invalid PIN ❌";
			}
			saveState(state); // ✅ SAVE HERE
		},

		deposit: (state, action) => {
			state.currentUser.balance += action.payload;
			state.currentUser.history.push({
				type: "Deposit",
				amount: action.payload,
				date: new Date().toLocaleString(),
			});
			saveState(state); // ✅ SAVE HERE
		},

		withdraw: (state, action) => {
			if (action.payload <= state.currentUser.balance) {
				state.currentUser.balance -= action.payload;
				state.currentUser.history.push({
					type: "Withdraw",
					amount: action.payload,
					date: new Date().toLocaleString(),
				});
			} else {
				state.message = "Insufficient balance ❌";
			}
			saveState(state); // ✅ SAVE HERE
		},

		changePin: (state, action) => {
			const { oldPin, newPin } = action.payload;

			// ❌ no logged-in user
			if (!state.currentUser) {
				state.message = "No active session ❌";
				return;
			}

			// ❌ old PIN wrong
			if (state.currentUser.pin !== oldPin) {
				state.message = "Old PIN is incorrect ❌";
				console.log(state.message);
				return;
			}

			// ❌ new PIN same as old
			if (oldPin === newPin) {
				state.message = "New PIN cannot be same as old PIN ❌";
				console.log(state.message);
				return;
			}

			// ❌ duplicate PIN check
			const pinExists = state.users.some((u) => u.pin === newPin);

			if (pinExists) {
				state.message = "PIN already in use ❌";
				console.log(state.message);
				return;
			}

			const updatedUser = {
				...state.currentUser,
				pin: newPin,
			};

			updateUserInUsers(state, updatedUser);

			state.message = "PIN changed successfully 🔐";
			console.log(state.message);
			saveState(state);
		},

		logout: (state) => {
			state.currentUser = null;
			state.message = "Session ended 👋";
			saveState(state);
		},
	},
});

export const { login, deposit, withdraw, logout, changePin } = atmSlice.actions;
export default atmSlice.reducer;
