import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavLink from "../../public/json/nav-data.json";

const NavBar = () => {
	const location = useLocation();

	return (
		<>
			<nav className="relative bg-gray-800 dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							<button
								type="button"
								command="--toggle"
								commandfor="mobile-menu"
								className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
							>
								<span className="absolute -inset-0.5"></span>
								<span className="sr-only">Open main menu</span>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									data-slot="icon"
									aria-hidden="true"
									className="size-6 in-aria-expanded:hidden"
								>
									<path
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									data-slot="icon"
									aria-hidden="true"
									className="size-6 not-in-aria-expanded:hidden"
								>
									<path
										d="M6 18 18 6M6 6l12 12"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
						<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex shrink-0 items-center">
								<img
									src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
									alt="Your Company"
									className="h-8 w-auto"
								/>
							</div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<button
								type="button"
								className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:hover:text-white"
							>
								<span className="absolute -inset-1.5"></span>
								<span className="sr-only">View notifications</span>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									data-slot="icon"
									aria-hidden="true"
									className="size-6"
								>
									<path
										d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* bottom Menu */}
			<nav className="relative bg-gray-800 dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:bg-white/10">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between">
						<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
							<div className="hidden sm:block">
								<div className="flex space-x-4 flex-wrap">
									{NavLink?.map((data) => {
										return (
											<Link
												key={data.id}
												to={data.link}
												className={
													location.pathname === data.link
														? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white dark:bg-gray-950/50 mb-2"
														: "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white mb-2"
												}
											>
												{data.text}
											</Link>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavBar;
