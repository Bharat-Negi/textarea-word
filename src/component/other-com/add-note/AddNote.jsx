import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardInfo from "./CardInfo";

const AddNote = () => {
	// form states
	const [name, setName] = useState("");
	const [imagep, setImagep] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [textdata, setTextdata] = useState("");

	// notes state (load from localStorage safely)
	const [data, setData] = useState(() => {
		try {
			const savedData = localStorage.getItem("note");
			return savedData ? JSON.parse(savedData) : [];
		} catch (error) {
			console.error("Invalid localStorage data", error);
			return [];
		}
	});

	// reset form
	const resetForm = () => {
		setName("");
		setImagep("");
		setEmail("");
		setPhone("");
		setTextdata("");
	};

	// submit handler
	function formHandel(e) {
		e.preventDefault();

		const newNote = {
			id: crypto.randomUUID(),
			name: name.trim(),
			imagep: imagep.trim(),
			email: email.trim(),
			phone: phone.trim(),
			textdata: textdata.trim(),
			time: new Date().toLocaleString(),
		};

		setData((prev) => [...prev, newNote]);

		resetForm();
	}

	// sync with localStorage
	useEffect(() => {
		console.log(data);
		localStorage.setItem("note", JSON.stringify(data));
	}, [data]);

	// delete note
	const deleteNote = (id) => {
		setData((prev) => prev.filter((item) => item.id !== id));
	};

	return (
		<>
			<div className="bg-gray-100 flex items-center justify-center p-4 mb-5">
				<form
					onSubmit={formHandel}
					className="bg-white shadow-lg rounded-xl p-6 w-full"
				>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Name
							</label>
							<input
								required
								type="text"
								value={name}
								placeholder="Enter your name"
								onChange={(e) => setName(e.target.value)}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Image
							</label>
							<input
								type="text"
								value={imagep}
								onChange={(e) => setImagep(e.target.value)}
								placeholder="Add Image"
								className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Email
							</label>
							<input
								required
								type="email"
								value={email}
								placeholder="Enter your email"
								onChange={(e) => setEmail(e.target.value)}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Phone Number
							</label>
							<input
								type="tel"
								value={phone}
								placeholder="Enter your phone number"
								onChange={(e) => setPhone(e.target.value)}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="col-span-2 mb-3">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Message
							</label>
							<textarea
								rows="4"
								value={textdata}
								placeholder="Write your message..."
								onChange={(e) => setTextdata(e.target.value)}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
							></textarea>
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-2xl font-medium hover:bg-blue-700 transition"
					>
						Submit
					</button>
				</form>
			</div>

			{/* NOTES LIST */}
			<div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
				{data?.map((nee) => {
					return (
						<CardInfo
							key={nee.id}
							id={nee.id}
							imagePath={nee.imagep}
							name={nee.name}
							email={nee.email}
							phone={nee.phone}
							timeSet={nee.time}
							textWrap={nee.textdata}
							deleteCard={deleteNote}
						/>
					);
				})}
			</div>
		</>
	);
};

export default AddNote;
