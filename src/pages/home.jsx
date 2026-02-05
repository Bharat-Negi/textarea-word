import { Link } from "react-router-dom";

const home = () => {
	return (
		<ul className="p-0 d-flex justify-content-center gap-5 flex-md-wrap">
			<Link to="/text-field">Text Area</Link>
			<Link to="/use-state">useState</Link>
			<Link to="/custom-hooks">Custom Hooks</Link>
			<Link to="/add-note">Add Notes</Link>
			<Link to="/redux-page">Redux</Link>
			<Link to="/dynamic-page">Dynamic Page</Link>
			<Link to="/search-page">Search Page</Link>
		</ul>
	);
};

export default home;
