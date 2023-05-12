import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import Modal from "../Modal/modal";
import Login from "../Login/Login";
import Button from "../Button/Button";
import Token from "../Token";
import { apiInstance } from "../../services/apiInstance";
import { authApiInstance } from "../../services/authApiInstance";

const Navbar = () => {
	const { token, removeToken, setToken } = Token();

	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState("");

	useEffect(() => {
		if (token) {
			getProfile();
		}
	}, [token]);

	const handleLogout = () => {
		apiInstance
			.post("/auth/logout")
			.then((res) => {
				toast.success(res.data.message);
				removeToken();
				setUser("");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getProfile = () => {
		authApiInstance
			.get("/auth/profile")
			.then((res) => setUser(res.data.username))
			.catch((e) => console.log(e));
	};

	return (
		<>
			<div className="navbar">
				<Link to="/">
					<img
						src={process.env.PUBLIC_URL + "/logo192.png"}
						alt="logo"
						className="logo"
					></img>
				</Link>
				{!token && token !== "" && token !== undefined ? (
					<Button
						id = "logIn"
						additionalStyles={"loginButton"}
						buttonType={"button"}
						handleClick={() => setIsOpen(true)}
					>
						Log in
					</Button>
				) : (
					<div>
						<span className="userGreeting">{`Hi, ${user}`}</span>
						<Button
							additionalStyles={"signButton"}
							buttonType={"button"}
							handleClick={handleLogout}
						>
							Log out
						</Button>
					</div>
				)}
				<Modal open={isOpen} onClose={() => setIsOpen(false)}>
					<Login onClose={() => setIsOpen(false)} setToken={setToken} />
				</Modal>

				<Button
						id = "ContinueGuest"
						additionalStyles={"continueButton"}
						buttonType={"button"}
						handleClick={() => alert("Continue as Guest")}
					>
						Continue as Guest
					</Button>

			</div>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover={false}
				theme="dark"
			/>
		</>
	);
};

export default Navbar;
