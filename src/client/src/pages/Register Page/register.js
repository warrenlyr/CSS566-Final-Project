import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";
import { apiInstance } from "../../services/apiInstance";

const Register = () => {
	const [username, setUsername] = useState("");
	const [pass, setPass] = useState("");
	const navigate = useNavigate();

	const handleRegister = (e) => {
		const data = {
			username: username,
			password: pass,
		};
		apiInstance
			.post("/auth/register", data)
			.then((res) => {
				toast.success(`${res.data.message}, Redirecting`);
				setTimeout(() => {
					navigate("/");
				}, 3500);
			})
			.catch((error) => {
				toast.error(error.response.data.error);
			});

		setUsername("");
		setPass("");
		e.preventDefault();
	};
	return (
		<>
			<div className="title">Register</div>
			<form onSubmit={handleRegister} className="registerForm">
				<label htmlFor="username" className="registerLabel">
					username
				</label>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					className="registerInput"
				/>
				<label htmlFor="password" className="registerLabel">
					password
				</label>
				<input
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					className="registerInput"
				/>
				<button type="submit" className="defaultButton registerButton">
					REGISTER
				</button>
			</form>
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

export default Register;
