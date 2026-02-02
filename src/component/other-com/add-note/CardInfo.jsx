const CardInfo = ({
	imagePath,
	name,
	textWrap,
	email,
	phone,
	deleteCard,
	id,
	timeSet,
}) => {
	return (
		<div className="bg-neutral-primary-soft block max-w-sm p-3 border border-default rounded-2xl shadow-xs mb-10">
			{imagePath && (
				<a href="#" className="max-h-40 overflow-hidden block rounded-2xl">
					<img className="object-cover object-center" src={imagePath} alt="" />
				</a>
			)}
			{name && (
				<h5 className="text-2xl font-semibold tracking-tight text-heading mt-3 mb-2">
					{name}
				</h5>
			)}
			<div className="grid grid-cols-1 mb-2 text-sm font-semibold text-gray-500">
				<div>Email: {email}</div>
				<div>Phone No.: {phone}</div>
				<div>Date: {timeSet}</div>
			</div>
			<p className="mb-6 text-body">{textWrap}</p>
			<a
				href="#"
				onClick={() => deleteCard(id)}
				className="inline-flex items-center bg-neutral-secondary-medium box-border bg-red-600 text-white hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-2xl text-sm px-4 py-2.5 focus:outline-none"
			>
				Delete
			</a>
		</div>
	);
};

export default CardInfo;
