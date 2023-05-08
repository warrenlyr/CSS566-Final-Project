import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Modal from "../Modal/modal";
import Login from "../Login/Login";
import Button from "../Button/Button";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="navbar">
			<Link to="/">
				<img
					src={process.env.PUBLIC_URL + "/logo192.png"}
					alt="logo"
					className="logo"
				></img>
			</Link>
			<Button
				additionalStyles={"signButton"}
				buttonType={"button"}
				handleClick={() => setIsOpen(true)}
			>
				Log in
			</Button>
			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				<Login onClose={() => setIsOpen(false)} />
			</Modal>
		</div>
	);
};

export default Navbar;
