import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardInfo from "./CardInfo";

const AddNote = () => {
	const [name, setName] = useState("");
	const [imagep, setImagep] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [textdata, setTextdata] = useState("");

	const [data, setData] = useState([]);

	function formHandel(e) {
		e.preventDefault();

		setData((prev) => [
			...prev,
			{
				id: crypto.randomUUID(8, 9),
				name,
				imagep,
				email,
				phone,
				textdata,
				time: new Date().toLocaleString(),
			},
		]);

		setName("");
		setImagep("");
		setEmail("");
		setPhone("");
		setTextdata("");
	}

	useEffect(() => {
		console.log(data);
	}, [data]);

	function deleteHandle(id) {
		setData((prev) => prev.filter((item) => item.id !== id));
	}

	return (
		<>
			<div className="my-3">
				<Link to="/">Home</Link>
			</div>

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
							deleteCard={deleteHandle}
						/>
					);
				})}
			</div>
		</>
	);
};

export default AddNote;
