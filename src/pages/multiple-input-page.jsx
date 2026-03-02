import React, { useState } from "react";

const MultipleInputPage = () => {
	// your exact state object
	const [details, setDetails] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		country: "",
		state: "",
		zip: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDetails((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(details);
	};

	// console.log(details);

	return (
		<div className="bg-slate-100 flex items-center justify-center min-h-screen p-4 font-sans">
			{/* simple card – matches the fields from image.png */}
			<div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
				{/* optional subtle heading (keeps it clean) */}
				<h2 className="text-xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-2">
					📋 contact information
				</h2>

				<form className="space-y-5" onSubmit={handleSubmit}>
					{/* Name */}
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Name:
							<span className="text-xs text-gray-400 font-normal">
								&nbsp;(required)
							</span>
						</label>
						<input
							type="text"
							name="name"
							onChange={handleChange}
							placeholder="Full name"
							className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                      focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                      transition duration-150 ease-in-out"
						/>
					</div>

					{/* Email */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Email:
						</label>
						<input
							type="email"
							name="email"
							onChange={handleChange}
							placeholder="hello@example.com"
							className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                      focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                      transition duration-150 ease-in-out"
						/>
					</div>

					{/* Phone */}
					<div>
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Phone:
						</label>
						<input
							type="tel"
							name="phone"
							onChange={handleChange}
							placeholder="+1 (555) 123-4567"
							className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                      focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                      transition duration-150 ease-in-out"
						/>
					</div>

					{/* Address (full width) */}
					<div>
						<label
							htmlFor="address"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Address:
						</label>
						<input
							type="text"
							name="address"
							onChange={handleChange}
							placeholder="Street, P.O. Box"
							className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                      focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                      transition duration-150 ease-in-out"
						/>
					</div>

					{/* Country + State (2‑column grid, exactly as shown: "Country: State:") */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{/* Country */}
						<div>
							<label
								htmlFor="country"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Country:
							</label>
							<select
								name="country"
								value={details.country}
								onChange={handleChange}
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                         transition duration-150 ease-in-out bg-white"
							>
								<option value="" disabled>
									- Select country -
								</option>
								<option value="US">United States</option>
								<option value="CA">Canada</option>
								<option value="UK">United Kingdom</option>
								<option value="AU">Australia</option>
								<option value="DE">Germany</option>
								<option value="FR">France</option>
								<option value="JP">Japan</option>
								<option value="BR">Brazil</option>
								<option value="IN">India</option>
								<option value="other">Other</option>
							</select>
						</div>
						{/* State */}
						<div>
							<label
								htmlFor="state"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								State:
							</label>
							<select
								name="state"
								value={details.state}
								onChange={handleChange}
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                         transition duration-150 ease-in-out bg-white"
							>
								<option value="" disabled>
									- Select state -
								</option>
								<option value="AL">Alabama</option>
								<option value="AK">Alaska</option>
								<option value="AZ">Arizona</option>
								<option value="AR">Arkansas</option>
								<option value="CA">California</option>
								<option value="CO">Colorado</option>
								<option value="CT">Connecticut</option>
								<option value="NY">New York</option>
								<option value="TX">Texas</option>
								<option value="WA">Washington</option>
								<option value="other">Other / not listed</option>
							</select>
						</div>
					</div>

					{/* Zip code (separate row, consistent with image) */}
					<div>
						<label
							htmlFor="zip"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Zip code:
						</label>
						<input
							type="text"
							name="zip"
							onChange={handleChange}
							placeholder="e.g. 90210 or A1B 2C3"
							className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                      focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                      transition duration-150 ease-in-out"
						/>
					</div>

					{/* subtle hint (non‑intrusive, but gives context) */}
					<p className="text-xs text-gray-400 italic pt-2 border-t border-gray-100">
						* fields exactly as shown in image.png - Name, Email, Phone,
						Address, Country/State (inline), Zip code
					</p>

					<button className="bg-red-700 text-white px-5 py-2 rounded focus:scale-95 cursor-pointer">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default MultipleInputPage;
