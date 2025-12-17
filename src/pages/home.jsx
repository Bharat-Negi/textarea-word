import React from "react";
import { Link } from "react-router-dom";

const home = () => {
	return (
		<ul className="p-0 d-flex justify-content-center gap-5 flex-md-wrap">
			<Link to="/text-field">Text Area</Link>
			<Link to="/use-state">useState</Link>
			<Link to="/use-effect">useEffect</Link>
			<Link to="/use-context">useContext</Link>
			<Link to="/use-ref">useRef</Link>
			<Link to="/use-reducer">useReducer</Link>
			<Link to="/use-layouteffect">useLayoutEffect</Link>
			<Link to="/use-memo">useMemo</Link>
			<Link to="/use-callback">useCallback</Link>
			<Link to="/custom-hooks">Custom Hooks</Link>
		</ul>
	);
};

export default home;
