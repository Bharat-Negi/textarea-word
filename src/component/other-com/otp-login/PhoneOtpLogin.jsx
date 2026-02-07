import React, { useState } from "react";
import OtpInput from "./OtpInput";

export const PhoneOtpLogin = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [showOtpInput, setShowOtpInput] = useState(false);

	const handlePhoneNumber = (event) => {
		event.preventDefault();
	};

	const handlePhoneSubmit = (e) => {
		e.preventDefault();

		// phone validation
		const regex = /[^0-9]/g;
		if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
			alert("Invalid Phone Number");
			return;
		}

		// Call Backend API
		// show OTP Field
		setShowOtpInput(true);

		// setPhoneNumber("");
	};

	const onOtpSubmit = (otp) => {
		console.log("Login Success full", otp);
	};

	return (
		<>
			{!showOtpInput ? (
				<form
					onSubmit={handlePhoneSubmit}
					className="flex justify-center gap-3"
				>
					<input
						type="text"
						value={phoneNumber}
						className="border px-3 py-2"
						placeholder="Enter Phone Number"
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<button className="btn">Submit</button>
				</form>
			) : (
				<div className="flex flex-col items-center gap-3">
					<h3>Send OTP on mobile {phoneNumber}</h3>
					<OtpInput length={4} onOtpSubmit={onOtpSubmit} />
				</div>
			)}
		</>
	);
};
