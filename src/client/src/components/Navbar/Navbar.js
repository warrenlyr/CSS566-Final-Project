import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
	return (
		<div className="navbar">
			<Link to="/">
				<img
					src={process.env.PUBLIC_URL + "/logo192.png"}
					alt="logo"
					className="logo"
				></img>
			</Link>
			<button className="sign-btn" onClick={() => alert("hello")}>
				Log in
			</button>
		</div>
	);
};

export default Navbar;
