import { Link } from "react-router-dom";
import CardInfo from "./CardInfo";

const AddNote = () => {
	function formHandel(e) {
		e.preventDefault();
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
								placeholder="Enter your name"
								className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Age
							</label>
							<input
								type="text"
								placeholder="Enter your age"
								className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Email
							</label>
							<input
								type="email"
								placeholder="Enter your email"
								className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Phone Number
							</label>
							<input
								type="tel"
								placeholder="Enter your phone number"
								className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="col-span-2 mb-3">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Message
							</label>
							<textarea
								rows="4"
								placeholder="Write your message..."
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

			<CardInfo />
		</>
	);
};

export default AddNote;
