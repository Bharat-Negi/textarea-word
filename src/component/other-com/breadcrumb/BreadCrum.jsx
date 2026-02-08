import React from "react";
import { IoMdHome, IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const BreadCrum = () => {
	const { pathname } = useLocation();
	const path = pathname.split("/").filter(Boolean);

	let breadcrumbPath = "";

	return (
		<nav className="flex mb-5" aria-label="Breadcrumb">
			<ol className="inline-flex items-center space-x-1 md:space-x-2">
				{/* Home */}
				<li className="inline-flex items-center">
					<Link
						to="/"
						className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
					>
						<IoMdHome className="mr-2" size={20} />
						Home
					</Link>
				</li>

				{/* Dynamic breadcrumb */}
				{path.map((name, index) => {
					breadcrumbPath += `/${name}`;
					const isLast = index === path.length - 1;

					return (
						<li key={breadcrumbPath} className="flex items-center">
							<IoIosArrowForward className="mx-1" />

							{isLast ? (
								<span className="text-sm font-medium text-body-subtle capitalize">
									{name}
								</span>
							) : (
								<Link
									to={breadcrumbPath}
									className="text-sm font-medium text-body hover:text-fg-brand capitalize"
								>
									{name}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default BreadCrum;
