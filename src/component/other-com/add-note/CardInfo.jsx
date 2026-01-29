const CardInfo = () => {
	return (
		<div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-2xl shadow-xs mb-10">
			<a href="#">
				<img
					className="rounded-2xl"
					src="https://plus.unsplash.com/premium_photo-1672423154405-5fd922c11af2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
				/>
			</a>
			<h5 className="text-2xl font-semibold tracking-tight text-heading mt-3 mb-2">
				Streamlining your design process today.
			</h5>
			<p className="mb-6 text-body">
				In todays fast-paced digital landscape, fostering seamless collaboration
				among Developers and IT Operations.
			</p>
			<a
				href="#"
				className="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-2xl text-sm px-4 py-2.5 focus:outline-none"
			>
				Read more
			</a>
		</div>
	);
};

export default CardInfo;
